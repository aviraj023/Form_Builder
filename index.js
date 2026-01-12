let fields = [];

function toggleOptions() {
  const type = document.getElementById('type').value;
  document.getElementById('options').style.display = type === 'radio' ? 'inline-block' : 'none';
}

function addField() {
  const label = document.getElementById('label').value;
  const type = document.getElementById('type').value;
  const required = document.getElementById('required').value;
  const options = document.getElementById('options').value;

  if (type === 'radio' && !options) {
    return alert('Enter radio options');
  }

  const field = { label, type, required, options };
  fields.push(field);

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${label}</td>
    <td>${type}</td>
    <td>${type === 'radio' ? options : '-'}</td>
    <td>${required}</td>
  `;

  document.getElementById('fieldsTable').appendChild(row);

  document.getElementById('label').value = '';
  document.getElementById('options').value = '';
}

function buildForm() {
  let formCode = `<form>\n`;

  fields.forEach(f => {
    const req = f.required === 'required' ? 'required' : '';
    formCode += `  <label>${f.label}</label>\n`;

    if (f.type === 'radio') {
      const opts = f.options.split(',');
      opts.forEach(o => {
        formCode += `  <input type="radio" name="${f.label}" value="${o.trim()}" ${req}> ${o.trim()}\n`;
      });
    } else {
      formCode += `  <input type="${f.type}" name="${f.label}" ${req}>\n`;
    }

    formCode += `  <br/><br/>\n`;
  });

  formCode += `  <button type="submit">Submit</button>\n</form>`;

  let finalCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Form</title>
</head>
<body>
    ${formCode}
</body>
</html>`




  document.getElementById('output').textContent = finalCode;
}