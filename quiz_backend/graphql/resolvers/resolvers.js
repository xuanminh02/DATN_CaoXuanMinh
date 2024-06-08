import connection from "../../database/config/init.js"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import { fakesleep } from "../../middleware/fake_sleep.js"
import fs from "fs"
import path from "path"
import Fuse from "fuse.js"
import _ from "lodash"
import DELETE_TERM from "../../controller/DELETE_TERM.js"
import CHANGE_ROLE_TERM from "../../controller/CHANGE_ROLE_TERM.js"
import CHANGE_ROLE_MEMBER_CLASS from "../../controller/CHANGE_ROLE_MEMBER_CLASS.js"
import createQuiz from "../../controller/quiziz/createQuiziz.js"

export const resolvers= {
    Query: {
        userLogin: async (parent, args, context)=> {
            const [rows]= await connection.execute("SELECT * FROM `user` WHERE uid=?", [args.uid])
            return rows[0]
        },
        member_of_class: async (parent, args, context)=> {
            const [rows]= await connection.execute("SELECT uid, photoURL, displayName, role FROM member_of_class INNER JOIN user ON user.uid = member_of_class.id_user WHERE member_of_class.id_class=?" , [args?.id_class])
            return rows
        },
        getinfoclass: async (parent, args, context)=> {
            const [rows]= await connection.execute("SELECT class_name, description, own_id, code_invite, invite, perform FROM classes WHERE id_class=?", [args?.id_class])
            return rows[0]
        },
        check_user_join_class: async (parent, args, context)=> {
            const [rows]= await connection.query("SELECT id_class, id_user FROM class_user_join WHERE `id_class`=? AND `id_user`= ?", [args.id_class, args.id_user])
            const [rows2]= await connection.execute("SELECT own_id FROM classes WHERE id_class=?", [args.id_class])
            const [rows3]= await connection.execute("SELECT role FROM member_of_class WHERE id_user= ? AND id_class=?", [args?.id_user, args?.id_class])
            if(rows?.length > 0 && rows2[0]?.own_id.toString() === args.id_user.toString()) return {check:1, isOwner: true, isMember: false, role: rows3[0]?.role}
            if(rows?.length > 0) return {check: 1, isOwner: false, isMember: true, role: rows3[0]?.role}
            return {check: 0, isOwner: false, isMember: false, role: rows3[0]?.role}
        },
        check_user_join_all_class: async (parent, args, context)=> {
            const [rows]= await connection.execute("SELECT member_of_class.id_class as id_class, class_name, description, own_id, displayName, photoURL FROM classes INNER JOIN member_of_class ON member_of_class.id_class = classes.id_class INNER JOIN user ON user.uid = classes.own_id WHERE member_of_class.id_user=?", [args?.id_user])
            return rows
        },
        get_term: async (parent, args, context)=> {
            const [rows3]= await connection.execute("SELECT uid, photoURL, displayName FROM user INNER JOIN term ON user.uid = term.own_id WHERE term.id_term=?", [args?.id_term])
            const [rowsxx]= await connection.execute("INSERT INTO user_learn_term VALUES(?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id_user=VALUES(id_user), id_term= VALUES(id_term), current_question= VALUES(current_question), time_created= VALUES(time_created), own_id= VALUES(own_id)", [args?.uid, args?.id_term, 1, moment(new Date()).format("DD/MM/YYYY"), rows3[0].own_id || ""])

            const [rows]= await connection.execute("SELECT title, description, visible, editable, current_question, term.id_term AS id_term, (SELECT COUNT(id_question) FROM question_of_term WHERE id_term=?) AS count_question FROM term INNER JOIN user_learn_term ON term.id_term = user_learn_term.id_term WHERE user_learn_term.id_user=? AND term.id_term=?", [ args?.id_term ,args?.uid, args?.id_term])
            const [rows2]= await connection.execute("SELECT question, answer, id_question from question_of_term WHERE id_term=?", [args?.id_term])
            if(rows2) {
                rows[0].list_question= rows2 || []
            }
            else {
                rows[0].list_question= [{id_question: null, question: null, answer: null}]
            }
            rows[0].author= rows3[0] || []
            if(args?.uid.toString() === rows3[0]?.uid) rows[0].is_owner= true
            else rows[0].is_owner= false        

            // console.log(rows[0])
            return rows[0]
        },
        request_join_class: async (parent, args, context)=> {
            const [rows]= await connection.execute("SELECT time_request, id_request_join, id_user, photoURL, displayName FROM request_join_class INNER JOIN user ON user.uid = request_join_class.id_user  WHERE id_class=?", [args.id_class])
            return rows
        },
        query_term: async (parent, args, context)=> {
            await fakesleep(1000)
            if(parseInt(args?.type)=== 1) {
                const [rows]= await connection.execute("SELECT title, description, id_term, own_id FROM term WHERE own_id=?", [args?.uid])
                return rows 
            }
            if(parseInt(args?.type)=== 2) {
                const [rows]= await connection.execute("SELECT user_learn_term.id_term, title, description, visible, editable, user_learn_term.time_created FROM term INNER JOIN user_learn_term ON user_learn_term.id_term = term.id_term WHERE user_learn_term.id_user= ?", [args.uid || ""])
                return rows
            }
        },
        get_term_of_class: async (parent, args, context)=> {
            try {
                const [rows]= await connection.execute("SELECT term_of_class.id_term as id_term, id_class, term.title, term.description, user.displayName as author_displayName, user.uid as author_id, user.photoURL as author_photoURL FROM term_of_class INNER JOIN term ON term.id_term = term_of_class.id_term INNER JOIN user ON user.uid = term.own_id WHERE term_of_class.id_class=?", [args.id_class])
                return rows
            } catch (error) {
                return error
            }
        },
        get_library: async (parent, args, context)=> {
            await fakesleep(1000)
            if(parseInt(args.query_type ) === 1 ) {
                const [rows]= await connection.execute("SELECT id_term, title, description, visible, editable, time_created FROM term WHERE own_id=?", [args.id_user || ""])
                return rows
            }
            if(parseInt(args.query_type)=== 2)  {
                const [rows]= await connection.execute("SELECT user_learn_term.id_term, title, description, visible, editable, user_learn_term.time_created FROM term INNER JOIN user_learn_term ON user_learn_term.id_term = term.id_term WHERE user_learn_term.id_user= ?", [args.id_user || ""])
                return rows
            }
        },
        term_join_all: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("SELECT DISTINCT term.id_term, title, description, visible, editable, term.time_created FROM term INNER JOIN question_of_term ON question_of_term.id_term = term.id_term WHERE own_id=?", [args?.id_user || ""])
            const [rows2]= await connection.execute("SELECT user_learn_term.id_term, title, description, visible, editable, term.time_created FROM term INNER JOIN user_learn_term ON user_learn_term.id_term = term.id_term WHERE user_learn_term.id_user= ?", [args.id_user || ""])
            return {data_own: rows, data_join: rows2}
        },
        all_class_user: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("SELECT DISTINCT classes.id_class, class_name, description, perform, invite, code_invite FROM classes INNER JOIN member_of_class ON member_of_class.id_class = classes.id_class WHERE own_id= ?", [args.id_user || ""])
            const [rows2]= await connection.execute("SELECT DISTINCT class_user_join.id_class, class_name, description, perform, invite, code_invite FROM class_user_join INNER JOIN classes ON class_user_join.id_class= classes.id_class WHERE class_user_join.id_user= ?", [args.id_user || ""])
            return {class_own: rows, class_join: rows2}
        }, 
        report_new_member_last_7_days: async (parent, args, context, info)=> {
            const [rows1]= await connection.execute("SELECT COUNT(id_user) FROM member_of_class INNER JOIN classes ON classes.id_class = member_of_class.id_class WHERE classes.own_id=? and member_of_class.time_join=?", [args.id_user || "", args.point_day || ""])
            const [rows2]= await connection.execute("SELECT COUNT(id_user) FROM member_of_class INNER JOIN classes ON classes.id_class = member_of_class.id_class WHERE classes.own_id=? and member_of_class.time_join=?", [args.id_user || "", moment(new Date()).subtract(1, "days").format("DD-MM-YYYY") || ""])
            const [rows3]= await connection.execute("SELECT COUNT(id_user) FROM member_of_class INNER JOIN classes ON classes.id_class = member_of_class.id_class WHERE classes.own_id=? and member_of_class.time_join=?", [args.id_user || "", moment(new Date()).subtract(2, "days").format("DD-MM-YYYY") || ""])
            const [rows4]= await connection.execute("SELECT COUNT(id_user) FROM member_of_class INNER JOIN classes ON classes.id_class = member_of_class.id_class WHERE classes.own_id=? and member_of_class.time_join=?", [args.id_user || "", moment(new Date()).subtract(3, "days").format("DD-MM-YYYY") || ""])
            const [rows5]= await connection.execute("SELECT COUNT(id_user) FROM member_of_class INNER JOIN classes ON classes.id_class = member_of_class.id_class WHERE classes.own_id=? and member_of_class.time_join=?", [args.id_user || "", moment(new Date()).subtract(4, "days").format("DD-MM-YYYY") || ""])
            const [rows6]= await connection.execute("SELECT COUNT(id_user) FROM member_of_class INNER JOIN classes ON classes.id_class = member_of_class.id_class WHERE classes.own_id=? and member_of_class.time_join=?", [args.id_user || "", moment(new Date()).subtract(5, "days").format("DD-MM-YYYY") || ""])
            const [rows7]= await connection.execute("SELECT COUNT(id_user) FROM member_of_class INNER JOIN classes ON classes.id_class = member_of_class.id_class WHERE classes.own_id=? and member_of_class.time_join=?", [args.id_user || "", moment(new Date()).subtract(6, "days").format("DD-MM-YYYY") || ""])

            return {
                day1: Object.values(rows1[0])[0], 
                day2: Object.values(rows2[0])[0],
                day3: Object.values(rows3[0])[0],
                day4: Object.values(rows4[0])[0],
                day5: Object.values(rows5[0])[0],
                day6: Object.values(rows6[0])[0],
                day7: Object.values(rows7[0])[0],
            }
        }, 
        USER_LEARNING_TERM: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("SELECT question_of_term.question,question_of_term.answer, question_of_term.id_question, is_star FROM user_learn_detail_term INNER JOIN question_of_term ON question_of_term.id_question = user_learn_detail_term.id_question WHERE user_learn_detail_term.id_term=? AND user_learn_detail_term.id_user= ?", [args.id_term || "", args.id_user || ""])
            return rows
        },
        USER_NOT_LEARN_TERM: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("SELECT question_of_term.question, question_of_term.id_question, question_of_term.answer FROM question_of_term OUTER JOIN user_learn_detail_term ON question_of_term.id_question = user_learn_detail_term.id_question WHERE question_of_term.id_term=? AND user_learn_detail_term.id_user=? ", [args.id_term || "", args.id_user || ""])
            return rows
        },
        access_view_user: async (parent, args, context, info)=> {
            const [rows1]= await connection.execute("SELECT COUNT(id_term) FROM access_learn_term WHERE own_id=? AND point_day=?", [args.id_user || "", moment(new Date()).subtract(0, "days").format("DD/MM/YYYY") || ""])
            const [rows2]= await connection.execute("SELECT COUNT(id_term) FROM access_learn_term WHERE own_id=? AND point_day=?", [args.id_user || "", moment(new Date()).subtract(1, "days").format("DD/MM/YYYY") || ""])
            const [rows3]= await connection.execute("SELECT COUNT(id_term) FROM access_learn_term WHERE own_id=? AND point_day=?", [args.id_user || "", moment(new Date()).subtract(2, "days").format("DD/MM/YYYY") || ""])
            const [rows4]= await connection.execute("SELECT COUNT(id_term) FROM access_learn_term WHERE own_id=? AND point_day=?", [args.id_user || "", moment(new Date()).subtract(3, "days").format("DD/MM/YYYY") || ""])
            const [rows5]= await connection.execute("SELECT COUNT(id_term) FROM access_learn_term WHERE own_id=? AND point_day=?", [args.id_user || "", moment(new Date()).subtract(4, "days").format("DD/MM/YYYY") || ""])
            const [rows6]= await connection.execute("SELECT COUNT(id_term) FROM access_learn_term WHERE own_id=? AND point_day=?", [args.id_user || "", moment(new Date()).subtract(5, "days").format("DD/MM/YYYY") || ""])
            const [rows7]= await connection.execute("SELECT COUNT(id_term) FROM access_learn_term WHERE own_id=? AND point_day=?", [args.id_user || "", moment(new Date()).subtract(6, "days").format("DD/MM/YYYY") || ""])
            
            return {
                day1: Object.values(rows1[0])[0], 
                day2: Object.values(rows2[0])[0],
                day3: Object.values(rows3[0])[0],
                day4: Object.values(rows4[0])[0],
                day5: Object.values(rows5[0])[0],
                day6: Object.values(rows6[0])[0],
                day7: Object.values(rows7[0])[0],
            }
        },
        LEARNING_TERM: async (parent, args, context, info )=> {
            await fakesleep(1000)
            const [rows]= await connection.execute("SELECT DISTINCT term.title, term.description, current_question, user_learn_term.id_term, term.own_id as own_id, user.displayName, user.photoURL FROM user_learn_term INNER JOIN term ON term.id_term = user_learn_term.id_term INNER JOIN question_of_term ON question_of_term.id_term = user_learn_term.id_term INNER JOIN user ON user.uid = term.own_id WHERE user_learn_term.id_user= ?", [args.id_user])
            if(rows[0]?.title === null ) {
                return []
            }
            // console.log(rows)
            return rows
        },
        SEARCH_BOT: async (parent, args, context, info)=> {
        
            await fakesleep(1000)
            const [rows1]= await connection.execute("SELECT title, description, id_term, user.displayName as author_displayName, user.photoURL as author_photoURL, user.uid as author_id FROM term INNER JOIN user ON term.own_id = user.uid WHERE MATCH(title) AGAINST(?) OR MATCH(description) AGAINST(?)", [args.query_search, args.query_search])
            const [rows2]= await connection.execute("SELECT class_name, description, id_class, user.displayName as author_displayName, user.photoURL as author_photoURL, user.uid as author_id FROM classes INNER JOIN user ON classes.own_id = user.uid WHERE MATCH(class_name) AGAINST (?) OR MATCH(description) AGAINST(?)", [args.query_search, args.query_search])
            const [rowsExtension1]= await connection.execute("SELECT title, description, id_term, user.displayName as author_displayName, user.photoURL as author_photoURL, user.uid as author_id FROM term INNER JOIN user ON term.own_id = user.uid")
            const [rowsExtension2]= await connection.execute("SELECT class_name, description, id_class, user.displayName as author_displayName, user.photoURL as author_photoURL, user.uid as author_id FROM classes INNER JOIN user ON classes.own_id = user.uid")

            const options= {
                keys: [
                    "title"
                ]
            }
            const options2= {
                keys: [
                    "class_name"
                ]
            }
            const fuse= new Fuse(rowsExtension1, options)
            const fuse2= new Fuse(rowsExtension2, options2)
            const searchFuse= []
            const searchFuse2= []
            fuse.search(args.query_search).map(item=> searchFuse.push(item.item))
            fuse2.search(args.query_search).map(item=> searchFuse2.push(item.item))
            
            // console.log(fuse2.search(args.query_search))
            
            return {term: _.uniq(rows1.concat(searchFuse), "id_term") || [], class: _.uniq(rows2.concat(searchFuse2), "id_class") || [], is_finish: true}
        },
        streak_learn: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("SELECT time_learn as day FROM user_learn_day WHERE id_user= ?", [args?.id_user])
            return {streak: rows, is_finish: true}
        },
        get_profile_user: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("SELECT displayName, photoURL, account_name FROM user WHERE uid= ?", [args.id_user])
            return rows[0]
        },
        CHECK_CODE_INVITE: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("SELECT id_class from classes WHERE code_invite=? ", [args?.code_invite])
            if(rows?.length > 0) {
                return { is_invite: true, id_class: rows[0]?.id_class }
            }
            return { is_invite: false }
        },
        stat_user_learn_term: async (parent, args, context, info)=> {
            const [rows1]= await connection.execute("SELECT COUNT(id_user) FROM user_learn_term WHERE own_id=? AND time_created= ?", [args.own_id || "", moment(new Date()).subtract(0, "days").format("DD/MM/YYYY") || ""])
            const [rows2]= await connection.execute("SELECT COUNT(id_user) FROM user_learn_term WHERE own_id=? AND time_created= ?", [args.own_id || "", moment(new Date()).subtract(1, "days").format("DD/MM/YYYY") || ""])
            const [rows3]= await connection.execute("SELECT COUNT(id_user) FROM user_learn_term WHERE own_id=? AND time_created= ?", [args.own_id || "", moment(new Date()).subtract(2, "days").format("DD/MM/YYYY") || ""])
            const [rows4]= await connection.execute("SELECT COUNT(id_user) FROM user_learn_term WHERE own_id=? AND time_created= ?", [args.own_id || "", moment(new Date()).subtract(3, "days").format("DD/MM/YYYY") || ""])
            const [rows5]= await connection.execute("SELECT COUNT(id_user) FROM user_learn_term WHERE own_id=? AND time_created= ?", [args.own_id || "", moment(new Date()).subtract(4, "days").format("DD/MM/YYYY") || ""])
            const [rows6]= await connection.execute("SELECT COUNT(id_user) FROM user_learn_term WHERE own_id=? AND time_created= ?", [args.own_id || "", moment(new Date()).subtract(5, "days").format("DD/MM/YYYY") || ""])
            const [rows7]= await connection.execute("SELECT COUNT(id_user) FROM user_learn_term WHERE own_id=? AND time_created= ?", [args.own_id || "", moment(new Date()).subtract(6, "days").format("DD/MM/YYYY") || ""])
            // console.log(rows1)
            return {
                day1: Object.values(rows1[0])[0], 
                day2: Object.values(rows2[0])[0],
                day3: Object.values(rows3[0])[0],
                day4: Object.values(rows4[0])[0],
                day5: Object.values(rows5[0])[0],
                day6: Object.values(rows6[0])[0],
                day7: Object.values(rows7[0])[0],
            }
        },
        SUGGEST_TERM: async (parent, args)=> {
            const [rows]= await connection.execute("SELECT DISTINCT term.title, term.description, current_question, user_learn_term.id_term, term.own_id as own_id, user.displayName, user.photoURL FROM user_learn_term INNER JOIN term ON term.id_term = user_learn_term.id_term INNER JOIN question_of_term ON question_of_term.id_term = user_learn_term.id_term INNER JOIN user ON user.uid = term.own_id ORDER BY RAND() LIMIT 8")
            if(rows[0]?.title === null ) {
                return []
            }
            return rows
        },
        GET_CATEGORIES: async (parent, args)=> {
            const [rows]= await connection.execute("SELECT category FROM template_categories")
            return rows
        },
        FIND_BY_CATEGORY: async (parent, args)=> {
            await fakesleep(1000)
            if(args.category?.length <=0 ) {
                return []
            }
            const [rows]= await connection.execute("SELECT term.id_term, term.title, term.description, term.own_id, user.photoURL, user.displayName FROM term INNER JOIN user ON term.own_id = user.uid WHERE term.category=?",[args.category])
            return rows
        }, 
        GET_RESULT_TEST: async (parent, args, context, info)=> {
            if(!args.id_user) {
                return []
            }
            const [rows]= await connection.execute("SELECT result_test.correct_answer, result_test.id_question, question_of_term.question, result_test.chose_answer FROM result_test INNER JOIN question_of_term ON question_of_term.id_question = result_test.id_question WHERE result_test.id_user= ? AND result_test.id_test= ?", [args.id_user, args.id_test])
            return rows
        },
        QUERY_EDIT_TERM: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("SELECT id_question, id_term, question, answer FROM question_of_term WHERE id_term= ?", [args.id_term])
            return rows
        }
    },

    Mutation: {
        createUser: async (parent, args, context)=> {
            try {
                const [rows]= await connection.execute("INSERT INTO `user` (uid, photoURL, account_name, displayName, class, languages, soundtrack, theme_game, time_created) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE uid= VALUES(uid), photoURL= VALUES(photoURL), account_name= VALUES(account_name), displayName= VALUES(displayName), class= VALUES(class), languages= VALUES(languages), soundtrack= VALUES(soundtrack), theme_game= VALUES(theme_game), time_created= VALUES(time_created)", [args.uid, args.photoURL, args.account_name, args.displayName, args.class, args.languages, args.soundtrack, args.theme_game, new Date()  ])
                return "success"
            } catch (error) {
                return console.log(error)
            }
        },
        updateUser: async (parent, args, context)=> {
            await fakesleep(1000)
            try {
                const [rows]= await connection.query("INSERT INTO `user` (uid, photoURL, account_name, displayName, class, languages, soundtrack, theme_game) VALUES(?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE uid= VALUES(uid), photoURL= ?, account_name= ?, displayName= ?, class= ?, languages= ?, soundtrack= ?, theme_game= ?", [args.uid, args.photoURL, args.account_name, args.displayName, args.class, args.languages, args.soundtrack, args.theme_game, args.photoURL, args.account_name, args.displayName, args.class, args.languages, args.soundtrack, args.theme_game ])
                return {is_update: true, uid: args?.uid, photoURL: args?.photoURL, account_name: args?.account_name, displayName: args?.displayName, class: args?.class, languages: args?.languages, soundtrack: args?.soundtrack, theme_game: args?.theme_game}
            } catch (error) {
                return console.log(error)                
            }
        },
        createClass: async (parent, args, context)=> {
            const id_class= uuidv4()
            const code_invite= uuidv4() 
            try {
                const [rows3]= await connection.execute("INSERT INTO member_of_class VALUES(?, ?, ?, ?)", [args.own_id, id_class, 3, moment(new Date()).format("DD-MM-YYYY")])
                const [rows]= await connection.execute("INSERT INTO `classes` VALUES(?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id_class= VALUES(id_class), class_name= VALUES(class_name), description= VALUES(description), perform= VALUES(perform), invite= VALUES(invite), own_id= VALUES(own_id), code_invite= VALUES(code_invite)", [id_class, args?.class_name, args?.description, args?.perform, args?.invite, args?.own_id, code_invite])
                const [rows2]= await connection.execute("INSERT INTO `class_user_join` VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE id_class= VALUES(id_class), id_user= VALUES(id_user), point= VALUES(point)", [id_class, args?.own_id, 1])
                return {id_class: id_class, class_name: args.class_name, description: args.description, perform: args.perform, invite: args.invite,own_id: args.own_id, code_invite: code_invite }
                
            } catch (error) {
                return console.log(error)
            }            
        },
        add_term_to_class: async (parent, args, context)=> {
            try {
                const [rows]= await connection.execute("INSERT INTO `term_of_class` VALUES(?, ?, ?, ?, ?)", [args.id_class, args.id_term, args.own_id, args.add_by, new Date()])
                return {is_add: true, exist: false}
            } catch (error) {
                return {is_add: false, exist: true}
            }
        },
        perform_request_join_class: async (parent, args, context)=> {
            // accept
            if(parseInt(args.type)=== 1) {
                const [rows]= await connection.execute("DELETE FROM request_join_class WHERE id_request_join= ?", [args.id_request_join])
                const [rows2]= await connection.execute("INSERT INTO member_of_class VALUES(?, ?, ?, ?)", [args.id_user, args.id_class,1, moment(new Date()).format("DD-MM-YYYY")])
                const [rows3]= await connection.execute("INSERT INTO class_user_join VALUES(?, ?, ?)", [args.id_class, args.id_user, 1])
                return {is_accept: true, is_deny: false, is_member: true}
            }
            else {
                const [rows]= await connection.execute("DELETE FROM request_join_class WHERE id_request_join= ?", [args.id_request_join])
                return {is_accept: false, is_deny: true, is_member: false}    
            }
        },
        mark_user_learn: async (parent, args, context, info)=> {
            if(!args.id_user) {
                return { is_learn: false }
            }
            const [rows]= await connection.execute("INSERT INTO user_learn_day VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE id_user= VALUES(id_user), user_learn= VALUES(user_learn), time_learn = VALUES(time_learn)", [args.id_user || "", args.user_learn || "", moment(new Date()).format("DD/MM/YYYY")])
            return { is_learn: true }
        },
        user_learn_detail_term: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("INSERT INTO user_learn_detail_term VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE id_user= VALUES(id_user), id_term= VALUES(id_term), id_question= VALUES(id_question), is_star= VALUES(is_star)", [args.id_user, args.id_term, args.id_question, false])
            return { is_learn: true }
        }, 
        MARK_STAR: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("UPDATE user_learn_detail_term SET is_star=? WHERE id_user=? AND id_term=? AND id_question=?", [args.is_star, args.id_user || "", args.id_term || "", args.id_question || ""])
            return { is_star: args.is_star }
        },
        ACCESS_LEARN_TERM: async (parent, args, context, info)=> {
            if(!args.id_user) {
                return { is_user: false }
            }
            const [rows]= await connection.execute("INSERT INTO access_learn_term VALUES(?, ?, ?, ?, ?)", [args.id_user, args.id_term, args.time_access,moment(new Date()).format("DD/MM/YYYY") ,args.own_id])
            return { is_user: true }
        },
        REQUEST_JOIN_CLASS_MUTATION: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("INSERT INTO request_join_class VALUES(?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id_request_join = VALUES(id_request_join), id_class= VALUES(id_class), id_user= VALUES(id_user), own_id= VALUES(own_id), time_request= VALUES(time_request)", [uuidv4(), args?.id_class, args?.id_user, args?.own_id, new Date()])
            return { is_send: true }
        },
        DELETE_TERM_FROM_CLASS: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("DELETE FROM term_of_class WHERE id_class=? AND id_term=?", [args?.id_class, args?.id_term])
            return { is_delete: true }
        },
        CHANGE_RULE_OF_CLASS: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("INSERT INTO classes(id_class, perform, invite) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE id_class=VALUES(id_class), perform= ?, invite= ?",[args?.id_class, args?.perform, args?.invite, args?.perform, args?.invite])
            return { is_change: true }
        },
        DELETE_MEMBER_FROM_CLASS: async (parent, args, context, info)=> {
            await connection.execute("SET FOREIGN_KEY_CHECKS=0")
            const [rows1]= await connection.execute("DELETE FROM class_user_join WHERE id_user=? AND id_class= ?", [args?.id_user, args?.id_class])
            const [rows]= await connection.execute("DELETE FROM member_of_class WHERE id_user=? AND id_class= ?", [args?.id_user, args?.id_class])
            return { is_delete: true }
        },
        CHANGE_ROLE_MEMBER_CLASS: CHANGE_ROLE_MEMBER_CLASS,
        uploadAvatar: async (parent, {file}, context, info)=> {
            const { createReadStream , filename, mimetype, encoding }= await file
            const stream= createReadStream()
            const pathName= path.join(__dirname, `/public/images/${filename}`)
            await stream.pipe(fs.createWriteStream(pathName))
            return {
                url: `http://localhost:4000/images/${filename}`,
                mimetype,
                encoding
            }
        },
        CHANGE_ROLE_TERM: CHANGE_ROLE_TERM,
        DELETE_TERM: DELETE_TERM,
        INSERT_TEST: async (parent, args, context, info)=> {
            const [rows]= await connection.execute("INSERT INTO result_test VALUES(?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id_test= VALUES(id_test), id_term= VALUES(id_term), id_question= VALUES(id_question), chose_answer= ?, correct_answer= VALUES(correct_answer), id_user= VALUES(id_user)", [args.id_test, args.id_term, args.id_question, args.chose_answer, args.correct_answer, args.id_user, args.chose_answer])
            return { is_insert: true }
        },
        UPDATE_QUESTION: async (parent,args, context, info)=> {
            const [rows] =await connection.execute("UPDATE question_of_term SET question= ? WHERE id_term= ? AND id_question= ?", [args.question, args.id_term, args.id_question])
            return { is_update: true }
        },
        UPDATE_ANSWER: async (parent,args, context, info)=> {
            const [rows] =await connection.execute("UPDATE question_of_term SET answer= ? WHERE id_term= ? AND id_question= ?", [args.question, args.id_term, args.id_question])
            return { is_update: true }
        },
        DELETE_QUESTION: async (parent, args, context, info)=> {
            const [row2]= await connection.execute("DELETE FROM user_learn_detail_term WHERE id_term= ? AND id_question= ?", [args.id_term, args.id_question])
            const [rows]= await connection.execute("DELETE FROM question_of_term WHERE id_term= ? AND id_question= ?", [args.id_term, args.id_question])
            return { is_delete: true }
        },
        ADD_QUESTION: async (parent, args)=> {
            const [rows]= await connection.execute("INSERT INTO question_of_term VALUES(?, ?, ?, ?)", [args.id_question, args.id_term, args.question, args.answer])
            return { is_add: true }
        }, 
        createQuiz: createQuiz
    }
}