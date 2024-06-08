import { gql } from "@apollo/client" 

const CREATETERM = gql`
    mutation createTerm($id_term: String!, $title: String!, $description: String!, $visible: Int!, $editable: Boolean!, $own_id: String!, $question: Array) {
        createTerm(id_term: $id_term, title: $title, description: $description, visible: $visible, editable: $editable, own_id: $own_id, question: $question) {
            id_term,
            title,
            description,
            visible,
            editable, 
            own_id,
        }
    }
`

export default CREATETERM