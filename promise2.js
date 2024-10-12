function getDetails(id){

  const request = fetch(`https://dummyjson.com/products/${id}`);
  
  const response = request.then((response) => {
    return response.json();
  });

  response.then((user) => {
    console.log(user);
  })
}

getDetails(2);