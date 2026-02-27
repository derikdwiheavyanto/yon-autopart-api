class Hewan {
    name: string
    constructor(name: string) {
        this.name = name
    }

    sound(sound: string) {
        return sound
    }
}

class Kucing extends Hewan {
    constructor(name: string) {
        super(name)
    }

    meow(sound: string) {
        console.log(sound)
        return sound
    }
}

class Sapi extends Kucing {
    constructor(name: string) {
        super(name)
    }

    moo(sound: string) {
        console.log(sound)
        return sound
    }
}

class Blasteran extends Sapi  {
    constructor(name: string) {
        super(name)
    }

    
    
}


const hewan = new Hewan("kucing")

const kucing: Hewan = new Kucing("kucing")
const sapi : Kucing & Sapi = new Sapi("sapi")

const blasteran: Kucing & Sapi  = new Blasteran("blasteran")

// console.log(hewan.sound("meow"))
// console.log(hewan.name)

sapi.
console.log()


console.log(kucing.sound("meow"))
