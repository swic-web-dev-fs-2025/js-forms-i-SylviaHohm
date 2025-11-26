import "./style.css";
const form = document.querySelector("form");
const REQUIRED = ["name", "email", "message"];
const result = document.querySelector("#result");
const submitBtn = form.querySelector('[type="submit"]');

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Pass the data object to the Results function to get HTML! 🚀
  result.innerHTML = Results(data);
});

function Results(data) {
  return `<ul class="space-y-1 text-sm">
        ${Object.entries(data)
          .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
          .join("")}
    </ul>   
    `;
}
form.addEventListener("input", () => {
  // Does EVERY form input field have a non-empty value?
  REQUIRED.every((field) => form[field].value.trim() !== "")
    ? (submitBtn.disabled = false) // If yes, enable button
    : (submitBtn.disabled = true); // If no, disable button
});
