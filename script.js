document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos
    const gameFilter = document.getElementById('gameFilter');
    const btnCreateRoom = document.getElementById('btnCreateRoom');
    const btnOpenJamPass = document.getElementById('btnOpenJamPass');
    const roomContainer = document.getElementById('roomContainer');

    const joinModal = document.getElementById('joinModal');
    const jampassModal = document.getElementById('jampassModal');
    const roomClipId = document.getElementById('roomClipId');

    const btnCloseJoin = document.getElementById('btnCloseJoin');
    const btnSaveHonor = document.getElementById('btnSaveHonor');
    const btnCloseJamPass = document.getElementById('btnCloseJamPass');
    const btnPayYape = document.getElementById('btnPayYape');

    // Función para abrir y cerrar modales
    function abrirModal(modal) {
        modal.style.display = 'flex';
    }

    function cerrarModal(modal) {
        modal.style.display = 'none';
    }

    // Filtrar salas por videojuego
    gameFilter.addEventListener('change', () => {
        const selected = gameFilter.value;
        const rooms = document.querySelectorAll('.room-card');

        rooms.forEach(card => {
            const cardGame = card.getAttribute('data-game');
            if (selected === 'todos' || cardGame === selected) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Delegación de eventos para botones "Unirme y Copiar ID"
    roomContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-join')) {
            const leaderId = e.target.getAttribute('data-id');
            const game = e.target.getAttribute('data-game');

            // Copiar ID al portapapeles de Windows
            if (navigator.clipboard) {
                navigator.clipboard.writeText(leaderId);
            }

            roomClipId.innerText = `${leaderId} (${game})`;
            abrirModal(joinModal);
        }
    });

    // Botón Crear Sala
    btnCreateRoom.addEventListener('click', () => {
        const title = prompt("Escribe el nombre de tu nueva sala:", "Squad Competitivo Serio");
        if (title && title.trim() !== "") {
            const newCard = document.createElement('div');
            newCard.className = 'room-card';
            newCard.setAttribute('data-game', 'Valorant');
            newCard.innerHTML = `
        <div>
          <div class="room-title">${title} <span style="font-size:11px; color:var(--green);">(¡Tu Sala!)</span></div>
          <div class="room-tags">
            <span class="tag-badge">NUEVA SALA</span>
            <span>Líder: <b>CarlosGamer#PE</b> (<span class="honor-stars">★ 4.9</span>)</span>
            <span>• Rango: Abierto</span>
            <span>• 🎤 Micro Obligatorio</span>
          </div>
        </div>
        <button class="btn-join" data-id="CarlosGamer#PE" data-game="Personalizada">Unirme y Copiar ID</button>
      `;
            roomContainer.prepend(newCard);
        }
    });

    // Modales de Jam Pass
    btnOpenJamPass.addEventListener('click', () => abrirModal(jampassModal));
    btnCloseJamPass.addEventListener('click', () => cerrarModal(jampassModal));

    btnPayYape.addEventListener('click', () => {
        alert('Simulación exitosa: ¡Tu membresía Jam Pass fue activada con Yape/Plin!');
        cerrarModal(jampassModal);
    });

    // Modales de Evaluación de Honor
    btnCloseJoin.addEventListener('click', () => cerrarModal(joinModal));
    btnSaveHonor.addEventListener('click', () => {
        alert('¡Calificación enviada! Tu voto mantiene limpia la comunidad de GameJam.');
        cerrarModal(joinModal);
    });
});