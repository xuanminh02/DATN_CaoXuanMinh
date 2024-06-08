import { useQuery } from '@apollo/client'
import { Navigate, useParams } from 'react-router-dom'
import CHECK_CODE_INVITE from '../../docs/graphql/query/check_code_invite'
import NotFound404 from '../NotFound/NotFound404'

const JoinClass = () => {
  const { code_invite }= useParams()
  // eslint-disable-next-line
  const { data, error, loading }= useQuery(CHECK_CODE_INVITE, {
    variables: {
        code_invite
    }
  })
  if(data?.CHECK_CODE_INVITE) {
    return (
        <>
            {
                data?.CHECK_CODE_INVITE?.is_invite === true && <Navigate to={`/class/${data?.CHECK_CODE_INVITE?.id_class}/`} state={{is_invite: data?.CHECK_CODE_INVITE?.is_invite}} replace={true}></Navigate>
            }   
            {
                data?.CHECK_CODE_INVITE?.is_invite === false && <NotFound404></NotFound404>
            } 
        </>
    )
  }
  else return <NotFound></NotFound>
  
}

export default JoinClass

const NotFound= ()=> {
    return (
        <div>
            Not found
        </div>
    )
}