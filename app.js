document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.querySelector('.grid-user')
    const comnputerGrid = document.querySelector('.grid-computer')
    const displayGrid = document.querySelector('.grid-display')
    const ships = document.querySelector('.ship');
    const destroyer = document.querySelector('.destroyer-container');
    const submarine = document.querySelector('.submarine-container');
    const cruiser = document.querySelector('.cruiser-container');
    const battleship = document.querySelector('.battleship-container');
    const carrier = document.querySelector('.carrier-container');

    const startButton = document.querySelector('#start')
    const rotateButton = document.querySelector('#rotate')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')

    const width = 10
    const userSquares = []
    const computerSquares = []
    //Create Boards
    function createBoard(grid, squares)
    {
        for(let i = 0; i < width * width; ++i)
        {
            const square = document.createElement('div')
            square.dataset.id = i
            grid.appendChild(square)
            squares.push(square)
        }
    }

    createBoard(userGrid, userSquares)
    createBoard(comnputerGrid, computerSquares)

    //Ships
    const shipArray = [
        {
            name: 'destroyer',
            directions: [
                [0, 1],
                [0, width]
            ]
        },

        {
            name: 'submarine',
            directions: [
                [0, 1, 2],
                [0, width, width*2]
            ]
        },

        {
            name: 'cruiser',
            directions: [
                [0, 1, 2],
                [0, width, width*2]
            ]
        },

        {
            name: 'battleship',
            directions: [
                [0, 1, 2, 3],
                [0, width, width*2, width*3]
            ]
        },

        {
            name: 'carrier',
            directions: [
                [0, 1, 2, 3, 4],
                [0, width, width*2, width*3, width*4]
            ]
        }
    ]

    //Draw the computer's ships in random locations
    function generate(ship)
    {
        let randomDirection = Math.floor(Math.random() * ship.directions.length)
        let current = ship.directions[randomDirection]

        if(randomDirection === 0) direction = 1
        if(randomDirection === 1) direction = 10

        let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))


        const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
        const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
        const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

        if(!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
        else generate(ship)
    }

    generate(shipArray[0])
    generate(shipArray[1])
    generate(shipArray[2])
    generate(shipArray[3])
    generate(shipArray[4])
})