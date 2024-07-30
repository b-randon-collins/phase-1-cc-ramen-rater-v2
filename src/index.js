// index.js

const handleClick = (id) => {
  fetch(`http://localhost:3000/ramens/${id}`)
    .then((resp) => resp.json())
    .then((details) => {
      document.querySelector(".detail-image").src = details.image;
      document.querySelector(".name").textContent = details.name;
      document.querySelector(".restaurant").textContent = details.restaurant;
      document.querySelector("#rating-display").textContent = details.rating;
      document.querySelector("#comment-display").textContent = details.comment;
    });
};

const addSubmitListener = () => {
  const addRamenForm = document.getElementById("new-ramen");

  addRamenForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("new-name").value;
    const restaurant = document.getElementById("new-restaurant").value;
    const image = document.getElementById("new-image").value;
    const rating = document.getElementById("new-rating").value;
    const comment = document.getElementById("new-comment").value;

    const ramenData = {
      name: name,
      restaurant: restaurant,
      image: image,
      rating: rating,
      comment: comment,
    };

    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ramenData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        const newRamenId = responseData.id;

        const newImg = document.createElement("img");
        newImg.src = image;
        newImg.addEventListener("click", () => handleClick(newRamenId));
        ramenMenu.appendChild(newImg);

        handleClick(newRamenId);
      })
  });
};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((ramens) => {
      ramens.map((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.addEventListener("click", () => {
          handleClick(ramen.id);
        });
        ramenMenu.appendChild(img);
      });
    return ramens
    })
    .then((useFirstRamen) => {
      handleClick(useFirstRamen[0].id)
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

export { displayRamens, addSubmitListener, handleClick, main };

document.addEventListener("DOMContentLoaded", function () {
  main();
});

const ramenMenu = document.getElementById("ramen-menu");
