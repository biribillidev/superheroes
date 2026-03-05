const apiUrl = 'http://localhost:8080/heroes'

function getHeroes(){
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao carregar heróis');
            }

            return response.json();
        });
}

function addHero(hero){
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hero)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao adicionar herói');
        }

        return response.json();
    });
}

function generateHeroId() {
    const randomPart = Math.floor(Math.random() * 1_000_000);
    return Number(`${Date.now()}${randomPart}`.slice(0, 15));
}

const heroForm = document.getElementById('hero-form');
const formMessage = document.getElementById('form-message');
const heroesList = document.getElementById('heroes-list');

function renderHeroes(heroes) {
    if (!heroesList) {
        return;
    }

    if (!Array.isArray(heroes) || heroes.length === 0) {
        heroesList.innerHTML = '<li class="rounded border border-slate-600 bg-slate-900 p-3 text-sm">Nenhum herói encontrado.</li>';
        return;
    }

    heroesList.innerHTML = heroes
        .map(hero => {
            const isAlive = hero.isAlive === true || hero.isAlive === 'true';
            const statusText = isAlive ? 'alive' : 'dead';
            const statusClasses = isAlive
                ? 'bg-emerald-900 text-emerald-300 border-emerald-700'
                : 'bg-red-900 text-red-300 border-red-700';

            return `
            <li class="rounded border border-slate-600 bg-slate-900 p-3 text-sm">
                <p><strong>id:</strong> ${hero.id}</p>
                <p><strong>name:</strong> ${hero.name}</p>
                <p><strong>superPower:</strong> ${hero.superPower}</p>
                <p><strong>level:</strong> ${hero.level}</p>
                <p class="flex items-center gap-2"><span class="inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusClasses}">${statusText}</span></p>
            </li>
        `;
        })
        .join('');
}

async function loadHeroes() {
    try {
        const heroes = await getHeroes();
        renderHeroes(heroes);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        if (heroesList) {
            heroesList.innerHTML = '<li class="rounded border border-red-700 bg-slate-900 p-3 text-sm text-red-400">Erro ao carregar heróis do servidor.</li>';
        }
    }
}

loadHeroes();

if (heroForm) {
    heroForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const hero = {
            id: generateHeroId(),
            name: heroForm.name.value.trim(),
            superPower: heroForm.superPower.value.trim(),
            level: Number(heroForm.level.value),
            isAlive: heroForm.isAlive.checked
        };

        try {
            await addHero(hero);
            formMessage.textContent = 'Herói criado com sucesso.';
            formMessage.className = 'mt-3 text-sm text-emerald-400';
            heroForm.reset();
            heroForm.level.value = 1;
            heroForm.isAlive.checked = true;
            await loadHeroes();
        } catch {
            formMessage.textContent = 'Não foi possível criar o herói.';
            formMessage.className = 'mt-3 text-sm text-red-400';
        }
    });
}