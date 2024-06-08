import { gql } from "@apollo/client"

const get_profile_user= gql`
    query get_profile_user($id_user: String!) {
        get_profile_user(id_user: $id_user) {
            photoURL,
            account_name, 
            displayName,
        }
    }
`

export default get_profile_user    