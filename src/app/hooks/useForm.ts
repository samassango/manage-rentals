const useFormRequired =(form: any)=>{
    let success= true;
    if(form){
        let keys = Object.keys(form)
        keys.forEach(key=>{
           if(form[key] !== ''){
              success = false
           }
        })
    }
    return [success]
}
export default useFormRequired