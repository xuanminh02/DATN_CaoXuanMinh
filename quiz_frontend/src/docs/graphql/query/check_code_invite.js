import { gql } from "@apollo/client"

const CHECK_CODE_INVITE= gql`
    query CHECK_CODE_INVITE($code_invite: String!) {
        CHECK_CODE_INVITE(code_invite: $code_invite) {
            is_invite,
            id_class
        }
    }
`

export default CHECK_CODE_INVITE    