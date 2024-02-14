const wrapper = document.querySelector('.wrapper')
const GenerateBtn = document.querySelector('.userInput button')
const Userinput = document.querySelector('.userInput input')
const dowloadBtn = document.querySelector('.dowloadBtn')
const qrCodeImg = document.getElementById('qrCode')
const scanBtn = document.querySelector('.scan-link')
const qrscanner = document.querySelector('.qr-scanner')
const heading = document.querySelector('.logo h2 span')
const closeBtn = document.querySelector('.closeBtn')


//Fecthing API
const fetchQrApi = async (Qrlink) => {
    try {
        let response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${Qrlink}`);
        if (!response.ok) {
            throw new Error('Failed to fetch QR code');
        }
        let imageUrl = response.url;
        qrCodeImg.src = imageUrl; 
        wrapper.classList.add('active')
        dowloadBtn.style.display = 'inline-block';

    } catch (error) {
        console.error('Error fetching QR code:', error);
    }
};

//Generate button event
GenerateBtn.addEventListener('click', ()=>{
    if(Userinput.value){
        let QrLink = Userinput.value
        setTimeout(()=>{
            fetchQrApi(QrLink)
            GenerateBtn.innerText= 'Generate QR Code'
        },1000)
        GenerateBtn.innerText = 'Generating...'
    }else{
        alert("Please enter a text or url")
    }
    
})

//Dowloading button event
dowloadBtn.addEventListener('click', (event) => {
    event.preventDefault(); 

    let url = qrCodeImg.src;
    let filename = 'qr-image.png';
    let link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});



//Generator or scanner Swapping button
scanBtn.addEventListener('click', () => {
    if (wrapper.classList.contains("remove") && qrscanner.classList.contains('active')) {
        wrapper.classList.remove('remove');
        qrscanner.classList.remove('active');
        scanBtn.innerHTML = 'Generate QR';
    } else {
        wrapper.classList.add("remove");
        qrscanner.classList.add('active');
    }

    heading.innerHTML =(heading.innerHTML === 'Generator') ? 'Scanner' : 'Generator'
    scanBtn.innerHTML = (scanBtn.innerHTML === 'Generate QR') ? '<span class="material-symbols-outlined">qr_code_scanner</span>Scan/upload QR' : 'Generate QR';
});

// close button appearing if user is typing
Userinput.addEventListener('input',()=>{
    if(Userinput.value.length > 0){
        closeBtn.style.display = 'block'
    }else{
        closeBtn.style.display = 'none'
    }
})

//close button function
closeBtn.addEventListener('click',()=>{
    wrapper.classList.remove('active')
    qrCodeImg.src = ''
    Userinput.value= ''
    closeBtn.style.display = 'none'
})




