import "./style.css";
const form = document.querySelector("form");
const REQUIRED = ["username", "email", "password", "confirm-password"];
const result = document.querySelector("#result");
const submitBtn = form.querySelector('[type="submit"]');

form.addEventListener("submit", handleSubmit);

function passwordsMatch({ passwordEl, confirmEl, output }) {
  const p = passwordEl?.value || '';
  const c = confirmEl?.value || '';
  if (p !== c) {
    output && Object.assign(output, { textContent: 'Passwords do not match', className: 'text-red-500 italic' });
    return false;
  }
  output && Object.assign(output, { textContent: '', className: '' });
  return true;
}

function handleSubmit(event) {
  event.preventDefault();
  const passwordEl = form.querySelector('#password');
  const confirmEl = form.querySelector('#confirm-password');
  const output = form.querySelector('output');
  if (!passwordsMatch(passwordEl, confirmEl, output)) return;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  if (result) result.innerHTML = Results(data);
}

function Results(data) {
  return `<ul class="space-y-1 text-sm">
        ${Object.entries(data)
          .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
          .join("")}
    </ul>   
    `;
}
submitBtn.disabled = true; // Start disabled

form.addEventListener("input", () => {
  // Does EVERY form input field have a non-empty value?
  REQUIRED.every((field) => form[field].value.trim() !== "")
    ? (submitBtn.disabled = false) // If yes, enable button
    : (submitBtn.disabled = true); // If no, disable button
    
});

