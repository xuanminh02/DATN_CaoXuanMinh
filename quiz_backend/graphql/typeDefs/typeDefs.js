import { gql } from "apollo-server-express";
export const typeDefs = gql`
    type Query {
        userLogin(uid: String!): User
        member_of_class(id_class: String!): [MemberOfClass],
        getinfoclass(id_class: String!): Class,
        check_user_join_class(id_user: String!, id_class: String!): UserJoinClass,
        check_user_join_all_class(id_user: String!): [UserJoinAllClass],
        get_term(uid: String, id_term: String): GetTerm,
        request_join_class(id_class: String!): [RequestJoinClass],
        query_term(uid: String, type: Int): [QueryTerm],
        get_term_of_class(id_class: String): [TermOfClass],
        get_library(id_user: String, query_type: Int): [Term],
        term_join_all(id_user: String): TermJoinAll,
        all_class_user(id_user: String): AllClassUser,
        report_new_member_last_7_days(id_user: String!, point_day: String!): NewMember,
        USER_LEARNING_TERM(id_user: String!, id_term: String): [UserLearnDetailTerm],
        USER_NOT_LEARN_TERM(id_user: String!, id_term: String): [UserLearnDetailTerm],
        access_view_user(id_user: String, point_day: String): AccessViewUser,
        LEARNING_TERM(id_user: String): [LearningTerm],
        SEARCH_BOT(id_user: String, query_search: String): SearchBot,
        streak_learn(id_user: String): Streak,
        get_profile_user(id_user: String): User,
        CHECK_CODE_INVITE(code_invite: String!): CodeInvite,
        stat_user_learn_term(own_id: String): NewUserLearn,
        SUGGEST_TERM: [LearningTerm],
        GET_CATEGORIES: [Category],
        FIND_BY_CATEGORY(category: String): [LearningTerm],
        GET_RESULT_TEST(id_test: String, id_user: String): [ResultTest],
        QUERY_EDIT_TERM(id_term: String): [QueryEditTerm]
    }
    type User {
        uid: String,
        photoURL: String,
        account_name: String,
        displayName: String,
        class: Int,
        languages: Int,
        soundtrack: Boolean,
        theme_game: Int,
        time_created: String,
        is_update: Boolean
    }
    type Class {
        id_class: String!,
        class_name: String!,
        description: String!,
        perform: Boolean!,
        invite: Boolean!,
        own_id: String!,
        code_invite: String,
        count_member: Int
    },
    type MemberOfClass {
        id_user: String!,
        id_class: String!,
        role: Int!,
        displayName: String!, 
        photoURL: String!,
        uid: String!
    },
    type UserJoinClass {
        check: Int,
        isOwner: Boolean,
        isMember: Boolean,
        role: Int,
    },
    type UserJoinAllClass {
        id_class: String!,
        class_name: String!, 
        description: String!, 
        photoURL: String, 
        displayName: String,
        own_id: String,
    },
    type Term {
        id_term: String,
        title: String!,
        description: String!,
        visible: Int!,
        editable: Int!,
        own_id: String!,
        time_created: String,
        time_updated: String,
        count_question: Int,
        is_author: Boolean
    }
    type QuestionOfTerm {
        id_question: String,
        id_term: String!,
        question: String!,
        answer: String!,
    }
    type GetTerm {
        uid: String,
        title: String,
        description: String,
        count_question: Int,
        current_question: Int,
        id_term: String,
        list_question: [Question],
        author: User,
        visible: Int,
        editable: Int
        
    }
    type Question {
        question: String,
        answer: String,
        id_question: String,   
    }
    type RequestJoinClass {
        time_request: String!,
        id_user: String!,
        photoURL: String, 
        displayName: String,
        id_request_join: String,
        is_send: Boolean
    }
    type QueryTerm {
        id_term: String,
        title: String,
        description: String,
        uid: String, 
        photoURL: String,
        displayName: String,
        own_id: String
    }
    type TermOfClass {
        id_class: String!, 
        id_term: String!, 
        own_id: String!, 
        add_by: String!, 
        time_add: String,
        title: String, 
        description: String,
        is_add: Boolean,
        exist: Boolean,
        count_question: Int,
        author_id: String, 
        author_displayName: String,
        author_photoURL: String
    }
    type PerfromRequestJoinClass {
        is_deny: Boolean,
        is_accept: Boolean,
        is_member: Boolean
    }
    type TermJoinAll {
        data_own: [Term],
        data_join: [Term]
    }
    type AllClassUser {
        class_own: [Class],
        class_join: [Class] 
    }
    type NewMember {
        day1: Int,
        day2: Int,
        day3: Int,
        day4: Int,
        day5: Int,
        day6: Int,
        day7: Int
    }
    type UserLearnDay {
        id_user: String!, 
        user_learn: Boolean,
        time_learn: String,
        is_learn: Boolean
    }
    type UserLearnDetailTerm {
        id_user: String, 
        id_term: String,
        id_question: String,
        is_star: Boolean,
        is_learn: Boolean,
        question: String,
        answer: String
    }
    type AccessLearnTerm {
        id_user: String,
        id_term: String,
        time_access: String,
        own_id: String,
        is_user: Boolean
    }
    type AccessViewUser {
        day1: Int, 
        day2: Int,
        day3: Int,
        day4: Int,
        day5: Int,
        day6: Int,
        day7: Int
    }
    type LearningTerm {
        title: String,
        description: String,
        current_question: Int,
        id_term: String,
        count_question: Int,
        photoURL: String,
        own_id: String,
        displayName: String,
    } 
    type SearchBot {
        class: [ClassBriefly],
        term: [TermBriefly],
        is_finish: Boolean 
    }
    type ClassBriefly {
        class_name: String,
        description: String,
        id_class: String,
        author_id: String,
        author_displayName: String,
        author_photoURL: String,
    }
    type TermBriefly {
        title: String, 
        description: String,
        id_term: String,
        author_id: String,
        author_displayName: String,
        author_photoURL: String
    }
    type Streak {
        streak: [DayString],
        is_finish: Boolean
    }
    type DayString {
        day: String
    }
    type CodeInvite {
        is_invite: Boolean,
        id_class: String
    }
    type DeleteTermFromClass {
        is_delete: Boolean
    }
    type ChangeRuleOfClass {
        is_change: Boolean
    }
    type DeleteMember {
        is_delete: Boolean
    }
    scalar Upload
    type File {
        url: String, 
        mimetype: String,
        encoding: String
    }
    type ChangeRuleOfTerm {
        is_change: Boolean
    }
    type NewUserLearn {
        day1: Int,
        day2: Int,
        day3: Int,
        day4: Int,
        day5: Int,
        day6: Int,
        day7: Int
    }
    type Category {
        category: String
    }
    type DeleteTerm {
        is_delete: Boolean
    }
    type InsertResultTest {
        is_insert: Boolean
    }
    type ResultTest {
        correct_answer: String,
        id_question: String,
        question: String,
        chose_answer: String,
    }
    type QueryEditTerm {
        id_question: String,
        id_term: String,
        question: String,
        answer: String
    }
    type UpdateTerm {
        is_update: Boolean
    }
    type DeleteTerm {
        is_delete: Boolean
    }
    type AddQuestion {
        is_add: Boolean
    }
    type Quiziz {
        id_quiziz: String, 
        owner_id: String,
        titleQuiz: String
    }
    type CreateQuiziz {
        is_create: Boolean,
    }
    type Mutation {
        createUser(uid: String!, photoURL: String!, account_name: String!, displayName: String!, class: Int!, languages: Int!, soundtrack: Boolean!, theme_game: Int!): User
        updateUser(uid: String, photoURL: String, account_name: String, displayName: String, class: Int, languages: Int, soundtrack: Boolean, theme_game: Int): User
        createClass(id_class: String!, class_name: String!, description: String!, perform: Boolean!, invite: Boolean!, own_id: String!): Class,
        add_term_to_class(id_class: String!, id_term: String!, own_id: String!, add_by: String!): TermOfClass,
        perform_request_join_class(id_class: String!, id_request_join: String!, type: Int!, id_user: String, own_id: String): PerfromRequestJoinClass,
        mark_user_learn(id_user: String, user_learn: Boolean): UserLearnDay,
        user_learn_detail_term(id_user: String!, id_term: String, id_question: String): UserLearnDetailTerm
        MARK_STAR(id_user: String!, id_term: String, id_question: String, is_star: Boolean): UserLearnDetailTerm,
        ACCESS_LEARN_TERM(id_user: String, id_term: String, time_access: String, own_id: String): AccessLearnTerm,
        REQUEST_JOIN_CLASS_MUTATION(id_class: String!, id_user: String, own_id: String): RequestJoinClass,
        DELETE_TERM_FROM_CLASS(id_class: String, id_term: String): DeleteTermFromClass,
        CHANGE_RULE_OF_CLASS(perform: Boolean, invite: Boolean, id_class: String): ChangeRuleOfClass,
        DELETE_MEMBER_FROM_CLASS(id_class: String, id_user: String): DeleteMember,
        CHANGE_ROLE_MEMBER_CLASS(id_class: String, id_user: String, role: Int): ChangeRuleOfClass,
        uploadAvatar(file: Upload!): File!,
        CHANGE_ROLE_TERM(id_term: String, visible: Int, editable: Int): ChangeRuleOfTerm,
        DELETE_TERM(id_term: String): DeleteTerm,
        INSERT_TEST(id_test: String, id_term: String, id_question: String, chose_answer: String, correct_answer: String, id_user: String): InsertResultTest,
        UPDATE_QUESTION(id_term: String, id_question: String, question: String): UpdateTerm,
        UPDATE_ANSWER(id_term: String, id_question: String, answer: String): UpdateTerm,
        DELETE_QUESTION(id_term: String, id_question: String): DeleteTerm,
        ADD_QUESTION(id_term: String, id_question: String, answer: String, question: String): AddQuestion,
        createQuiz(id_quiziz: String, owner_id: String, titleQuiz: String, categoryQuiz: [String]): CreateQuiziz
    }
`;
