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
    output.textContent = "Passwords do not match";
    return false;
  }
  output.textContent = '' ;
  return true;
}

function handleSubmit(event) {
  event.preventDefault();
  const passwordEl = form.querySelector('#password');
  const confirmEl = form.querySelector('#confirm-password');
  const output = form.querySelector("output");
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

function checkFormValidity() {
  const passwordEl = form.querySelector('#password');
  const confirmEl = form.querySelector('#confirm-password');
  const output = form.querySelector('output');
  const allFilled = REQUIRED.every((field) => form[field].value.trim() !== "");
  const pwdsMatch = passwordEl?.value === confirmEl?.value;
  const p = passwordEl?.value || '';
  const c = confirmEl?.value || '';
  submitBtn.disabled = !(allFilled && pwdsMatch);
  output && (output.textContent = (p && c && !pwdsMatch) ? 'Passwords do not match' : '');
}

form.addEventListener("input", checkFormValidity);

