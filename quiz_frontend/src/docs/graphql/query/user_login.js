import { gql } from "@apollo/client"

const USERLOGIN= gql`
    query userLogin($uid: String!) {
        userLogin(uid: $uid) {
            uid,
            photoURL,
            account_name, 
            displayName,
            class,
            languages,
            soundtrack,
            theme_game,
            time_created
        }
    }
`

export default USERLOGIN    