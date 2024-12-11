const SERVER_ADDRESS = "http://localhost:8000/"

export async function get(requestName){
  return await (await fetch(SERVER_ADDRESS + requestName,{method:"GET"})).json()
}

export async function post(requestName,body){
    return await fetch(SERVER_ADDRESS + requestName,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
    });
}