import { gql } from "@apollo/client"

const MEMBER_OF_CLASS= gql`
    query member_of_class($id_class: String!) {
        member_of_class(id_class: $id_class) {
            uid,
            photoURL, 
            displayName,
            role
        }
    }
`

export default MEMBER_OF_CLASS    