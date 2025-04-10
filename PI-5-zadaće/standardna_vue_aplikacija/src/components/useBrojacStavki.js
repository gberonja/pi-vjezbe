import {ref} from 'vue'

const brojac = ref(0)

function postavi(noviBroj){
    brojac.value = noviBroj
}

export function useBrojacStavki(){
    return {brojac, postavi}
}