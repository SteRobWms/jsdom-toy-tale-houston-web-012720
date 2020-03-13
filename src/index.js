let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function addCard(toy) {
  const toyCollection = document.querySelector("#toy-collection");
  const div = makeToyCard(toy);
  toyCollection.append(div);
}

function makeToyCard(toy) {
  const div = document.createElement("div");
  div.className = "card";
  
  const name = document.createElement("h2");
  name.innerText = toy.name;
  
  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar"
  img.style.height = "200px";
  img.style.width = "auto";
  
  const likes = document.createElement("p");
  likes.innerText = `${toy.likes} Likes`;
  
  const likeBtn = document.createElement("button");
  likeBtn.innerText = "Like This Toy";
  likeBtn.className = "like-btn";

  div.append(name, img, likes, likeBtn);
  
  return div;
}

function showToys(toyArray) {
  toyArray.map(toy => {
    addCard(toy);
  });
}

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(toys => showToys(toys))

let form = document.querySelector(".container form")

form.addEventListener("submit", () => {
  event.preventDefault();
  debugger
  const name = form.querySelectorAll("input")[0].value
  const image = form.querySelectorAll("input")[1].value

  fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
      })
  })
  .then(res => res.json())
  .then(toy => {
    addCard(toy)
    form.reset()
  })
})