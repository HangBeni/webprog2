<script lang="ts">
	import type { Links } from "../../utils/types";

    export const links : Links[] = [
    {name: "Főoldal", link: "/"},
    {name: "Bejelentkezés", link: "/login"}, //Ha be van jelentkezve akkor cserélje ki egy avatarral
    //Saját bandám bejelentkezés után ha van a usernek
    ];
</script>

<nav>
    <ul>
        {#each links as link}
            <li><a href={link.link}>{link.name}</a></li>
        {/each}
        <details >
            <summary>Regisztáció</summary>
            <a href="/registration/band">Banda regisztráció</a>
            <a href="/registration/user">User regisztráció</a>
        </details>
    </ul>
</nav> 