// index.js

const handleClick = (ramen) => {
  const detailImg = document.querySelector(".detail-image");
  const detailName = document.querySelector(".name");
  const detailRestaurant = document.querySelector(".restaurant");
  const detailRating = document.querySelector("#rating-display");
  const detailComment = document.querySelector("#comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const addRamenForm = document.getElementById("new-ramen");

  addRamenForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("new-name");
    const restaurantInput = document.getElementById("new-restaurant");
    const imageInput = document.getElementById("new-image");
    const ratingInput = document.getElementById("new-rating");
    const commentInput = document.getElementById("new-comment");

    const name = nameInput.value;
    const restaurant = restaurantInput.value;
    const image = imageInput.value;
    const rating = ratingInput.value;
    const comment = commentInput.value;

    const ramenData = {
      name: name,
      restaurant: restaurant,
      image: image,
      rating: rating,
      comment: comment,
    };

    try {
      const response = await fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ramenData),
      });
      const responseData = await response.json();

      const ramenMenu = document.getElementById("ramen-menu");
      if (!ramenMenu) {
        throw new Error("Element with ID 'ramen-menu' not found");
      }

      const img = document.createElement("img");
      img.src = responseData.image;
      img.id = responseData.id;
      img.addEventListener("click", () => handleClick(responseData));

      ramenMenu.appendChild(img);
      handleClick(responseData);

      nameInput.value = "";
      restaurantInput.value = "";
      imageInput.value = "";
      ratingInput.value = "";
      commentInput.value = "";
    } catch (error) {
      console.error("Failed to add new ramen:", error);
    }
  });
};

const displayRamens = async () => {
  console.log("displayRamens");
  try {
    const resp = await fetch("http://localhost:3000/ramens");
    const ramens = await resp.json();

    const ramenMenu = document.getElementById("ramen-menu");
    if (!ramenMenu) {
      throw new Error("Element with ID 'ramen-menu' not found");
    }

    ramenMenu.innerHTML = "";

    ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.id = ramen.id;
      img.addEventListener("click", () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });

    handleClick(ramens[0]);
  } catch (error) {
    console.error("Failed to fetch ramens:", error);
  }
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

export { displayRamens, addSubmitListener, handleClick, main };

document.addEventListener("DOMContentLoaded", function () {
  main();
});
