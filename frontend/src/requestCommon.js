const SERVER_ADDRESS = "http://localhost:8000/"

export async function get(requestName){
  return await (await fetch(SERVER_ADDRESS + requestName,{method:"GET"})).json()
}

export const post = async (endpoint, data) => {
  const response = await fetch(`http://localhost:8000/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return response;
};