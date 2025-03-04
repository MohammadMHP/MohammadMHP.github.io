// const showCake = () => {
//     document.querySelector('#cake-holder').classList.add('done')
// }


document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const cakeHolder = document.getElementById('cake-holder');
    const flame = document.querySelector('.flame');

    startButton.addEventListener('click', () => {
        // Show the cake
        cakeHolder.style.opacity = '1';
        
        // Hide the start button
        startButton.style.display = 'none';
        
        // Ensure flame is visible
        flame.style.display = 'block';
    });
});