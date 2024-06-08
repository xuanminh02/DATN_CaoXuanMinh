export const outside_f= (e, ref, setopen)=> {
    if(ref.current && ref.current.contains(e.target)) {
        setopen(()=> false)
    }
}