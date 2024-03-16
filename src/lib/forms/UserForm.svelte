<script lang="ts">
    import type { FormType } from "$lib/types";

    let reqType = true;
    let loginRes = {
        success: false,
        user: null
    };
    let form: FormType = {
        userName: '',
        userEmail: '',
        userPassword: '',
        userBand: ''
    };

    async function handleReg() {
        await fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
    }

    async function handleLogin() {
        loginRes = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(res => res.json());
    }

    
</script>

<div>
    <div class="inputPlaceholder">
        <label for="userName">User Name</label>
        <input
            autoComplete="nickname"
            required
            minLength={5}
            type="text"
            name="userName"
            id="userName"
            bind:value={form.userName}
        />
        <span class="userNameError"></span>

        <label for="userEmail">Email</label>
        <input
            autoComplete="email"
            disabled={!reqType}
            required
            type="email"
            name="userEmail"
            id="userEmail"
            bind:value={form.userEmail}
        />
        <span class="emailError"></span>

        <label for="userPassword">Password</label>
        <input
            autoComplete="off"
            required
            minLength={5}
            type="password" 
            name="userPassword"
            id="userPassword"
            bind:value={form.userPassword}
        />
        <span class="passwordError"></span>

        <label for="userBand">Banda</label>
        <input autoComplete="off" required type="text" name="userBand" id="userBand" bind:value={form.userBand}/>

        <input type="checkbox" name="reqTypeBox" id="reqTypeBox" bind:checked={reqType} />
        <input type="button" value={reqType ? 'Regisztráció' : 'Bejentkezés'} on:click={reqType ? handleReg : handleLogin} id="submitB" />
    </div>
</div>

{#if loginRes.success}
    <p>Login successful. User: {JSON.stringify(loginRes.user)}</p>
{:else if loginRes.success === false}
    <p>Login failed.</p>
{/if}
