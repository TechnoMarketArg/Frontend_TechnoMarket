 const searchHandler = (searchTerm) => {
    console.log("hola");
    const filteredProduct = Data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  }