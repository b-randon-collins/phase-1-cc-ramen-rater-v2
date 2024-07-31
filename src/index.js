// index.js

const handleClick = (image) => {
  const id = String(image.id);

  fetch(`http://localhost:3000/ramens/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((ramen) => {
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
    })
    .catch((error) => {
      console.error("Failed to fetch ramen details:", error);
    });
};


const addSubmitListener = () => {
  const addRamenForm = document.getElementById("new-ramen");

  addRamenForm.addEventListener("submit", async (e) => {
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

    try {
      const response = await fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ramenData),
      });
      const responseData = await response.json();
      const newRamenId = responseData.id;

      const ramenMenu = document.getElementById("ramen-menu");
      if (!ramenMenu) {
        throw new Error("Element with ID 'ramen-menu' not found");
      }

      const img = document.createElement("img");
      img.src = image;
      img.id = newRamenId;
      img.addEventListener("click", () => handleClick(img));
      ramenMenu.appendChild(img);

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

    //select first ramen on load
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

