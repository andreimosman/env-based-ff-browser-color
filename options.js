const devHostnames = document.getElementById("devHostnames");
const qaHostnames = document.getElementById("qaHostnames");
const prodHostnames = document.getElementById("prodHostnames");

const saveButton = document.getElementById("save");

browser.storage.local.get()
  .then((result) => {
    devHostnames.value = result.devHostnames || "";
    qaHostnames.value = result.qaHostnames || "";
    prodHostnames.value = result.prodHostnames || "";
  });

saveButton.addEventListener("click", function() {
  browser.storage.local.set({
    devHostnames: devHostnames.value,
    qaHostnames: qaHostnames.value,
    prodHostnames: prodHostnames.value
  });
});
