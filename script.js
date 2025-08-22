document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".item-checkbox");
    const totalElement = document.getElementById("total");

    function updateTotal() {
        let total = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                total += parseFloat(cb.dataset.value);
            }
        });
        const formatted = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        totalElement.textContent = formatted;
    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", function () {
            const group = this.dataset.group;
            if (group) {
                checkboxes.forEach(other => {
                    if (other !== this && other.dataset.group === group) {
                        other.checked = false;
                    }
                });
            }
            updateTotal();
        });
    });

    updateTotal();
// Linha nova – Monitorar mudanças no nome e e-mail
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const finalizarBtn = document.getElementById('finalizar');

function validarCampos() {
  const nomeValido = nomeInput.value.trim() !== '';
  const emailValido = emailInput.value.trim() !== '';
  finalizarBtn.disabled = !(nomeValido && emailValido);
}

// Adiciona listeners para ativar o botão apenas se os dois campos estiverem preenchidos
nomeInput.addEventListener('input', validarCampos);
emailInput.addEventListener('input', validarCampos);
document.getElementById('finalizar').addEventListener('click', function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const total = document.getElementById('total').textContent;

  if (!nome || !email) {
    alert('Por favor, preencha seu nome e e-mail antes de finalizar.');
    return;
  }

  let conteudo = `E-mail: ${email}\n\nItens selecionados:\n`;

  checkboxes.forEach(function (checkbox) {
    const row = checkbox.closest('tr');
    const item = row.querySelectorAll('td')[0].textContent.trim();
    const value = row.querySelectorAll('td')[1].textContent.trim();
    conteudo += `- ${item} (${value})\n`;
  });

  conteudo += `\nTOTAL: ${total}`;

  const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');

  // Limpa espaços e caracteres inválidos no nome para usar como nome de arquivo
  const nomeArquivo = `orcamento_${nome.replace(/\s+/g, '_').replace(/[^\w\-]/g, '')}.txt`;

  link.download = nomeArquivo;
  link.href = URL.createObjectURL(blob);
  link.click();
});

});