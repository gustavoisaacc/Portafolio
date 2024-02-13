document.addEventListener("DOMContentLoaded", () => {
  let edad = document.querySelector("#edad");

  function calculateAge(birthday) {
    let birthday_arr = birthday.split("/");

    let birthday_date = new Date(
      birthday_arr[2],
      birthday_arr[1] - 1,
      birthday_arr[0]
    );
    let ageDifMs = Date.now() - birthday_date.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  let age = calculateAge("20/05/1993");
  edad.innerHTML = age;

  let firstname = document.querySelector(".first-name");
  let lastname = document.querySelector(".last-name");

  //Efecto maquina de escribir
  const typeWrite = (first, time) => {
    let nameString = first.innerHTML.split("");
    first.innerHTML = "";

    setTimeout(() => {
      nameString.forEach((word, index) => {
        setTimeout(() => {
          first.innerHTML += `${word}`;
        }, 200 * index);
      });
    }, time);
  };
  typeWrite(firstname, 2000);
  typeWrite(lastname, 4500);

  //Efecto scroll
  document.addEventListener("scroll", () => {
    let header = document.querySelector(".porfile");
    let position = header.getBoundingClientRect().top;
    let height = window.innerHeight;

    if (position < height) {
      header.style.animation = "select 1s ease-out";
    } else {
      header.style.animation = null;
    }
  });

  //menu
  const menu = document.querySelectorAll(".menu li");
  menu.forEach((item) => {
    item.addEventListener("click", () => {
      const tabs = document.querySelectorAll(".menu ul li");
      tabs.forEach((tab) => tab.classList.remove("active"));
      if (!item.classList.contains("active")) {
        item.classList.add("active");
      }
    });
  });

  // const repositorios = document.getElementById("project");
  // function getGithub() {
  //   fetch("https://api.github.com/users/gustavoisaacc/repos").then(
  //     async (res) => {
  //       if (!res.ok) {
  //         throw new Error(res.status);
  //       }

  //       const data = await res.json();

  //       const m = data.toSorted(
  //         (a, b) => b.created_at.split("-")[0] - a.created_at.split("-")[0]
  //       );

  //       m.map((item) => {
  //         const project = document.createElement("div");

  //         project.innerHTML = `
  //           <div class="project" >
  //             <div class="project__title">
  //               <h4 class="name">${item.name}</h4>
  //               <span class="data">${Intl.DateTimeFormat("pt-BR").format(
  //                 new Date(item.created_at)
  //               )}</span>
  //             </div>
  //             <div class="skill">
  //               <a href="${item.html_url}" class="code" target="_blank">code</a>
  //               <p class="leguage">${
  //                 item.language === null ? "Javascript" : item.language
  //               }</p>
  //             </div>
  //           </div>
  //         `;

  //         repositorios.appendChild(project);
  //       });
  //     }
  //   );
  // }

  // getGithub();

  const section = document.querySelectorAll(".box");
  const menuItems = document.querySelectorAll(".menu_items");

  const functionObserver = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const itemActual = Array.from(menuItems).find(
          (item) => item.dataset.url === entry.target.id
        );
        itemActual.classList.add("active");
        for (item of menuItems) {
          if (item !== itemActual) {
            item.classList.remove("active");
          }
        }
      }
    });
  };

  const observer = new IntersectionObserver(functionObserver, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  });
  section.forEach((item) => observer.observe(item));

  //carrusel
  const btnLeft = document.querySelector(".arrow--left");
  const btnRight = document.querySelector(".arrow--right");
  const slider = document.querySelector("#slider");
  const sliderItems = document.querySelectorAll(".slider--section");

  setInterval(() => {
    // optionRight();
  }, 3000);

  btnRight.addEventListener("click", optionRight);
  btnLeft.addEventListener("click", optionLeft);

  let operacion = 0;
  let count = 0;
  let contItem = 100 / sliderItems.length;

  function optionRight() {
    if (count >= sliderItems.length - 1) {
      operacion = 0;
      count = 0;
      slider.style.transform = `translateX(-${operacion}%)`;
      slider.style.transition = "none";
      return;
    }
    count++;
    operacion = operacion + contItem;
    slider.style.transform = `translateX(-${operacion}%)`;
    slider.style.transition = "all ease 0.5s";
  }

  function optionLeft() {
    count--;
    if (count < 0) {
      operacion = contItem * (sliderItems.length - 1);
      count = sliderItems.length - 1;
      slider.style.transform = `translateX(-${operacion}%)`;
      slider.style.transition = "none";
      return;
    }
    operacion = operacion - contItem;
    slider.style.transform = `translateX(-${operacion}%)`;
    slider.style.transition = "all ease 0.5s";
  }
});
