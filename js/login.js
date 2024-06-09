document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var password = document.getElementById('password').value;
    var name_login = document.getElementById('name-login').value;

    var errorMessage = document.getElementById('error-message');
    if (password === 'senha123') {
        // Redirecionar para a página de mercado caso a senha esteja correta
        localStorage.setItem('user_login', name_login)
        window.location.href = 'gerenciamento.html';
    } else {
        // Mostrar mensagem de erro se a senha estiver incorreta
        errorMessage.style.display = 'block';
    }
});