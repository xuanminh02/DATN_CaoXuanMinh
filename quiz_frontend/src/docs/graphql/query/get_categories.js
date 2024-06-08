import { gql } from "@apollo/client"

const GET_CATEGORIES= gql`
    query GET_CATEGORIES {
        GET_CATEGORIES {
            category
        }
    }
`

export default GET_CATEGORIES    