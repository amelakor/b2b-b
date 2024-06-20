document.addEventListener('DOMContentLoaded', () => {
    fetch('gloves--.svg')
        .then(response => response.text())
        .then(svgText => {
            document.getElementById('svgContainer').innerHTML = svgText;
        })
        .catch(error => console.error('Error loading SVG:', error));
});

function changeColor() {
    const color = document.getElementById('colorPicker').value;
    const svg = document.querySelector('#svgContainer svg');
    if (svg) {
        svg.querySelectorAll('.change-color').forEach(element => {
            element.setAttribute('fill', color);
        });
    }
}

function addText() {
    const text = document.getElementById('overlayText').value;
    const svg = document.querySelector('#svgContainer svg');
    if (svg) {
        const newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        newText.setAttribute('x', '50');
        newText.setAttribute('y', '50');
        newText.setAttribute('fill', 'black');
        newText.setAttribute('font-size', '55px');  
        newText.textContent = text;
        svg.appendChild(newText);
    }
}

function downloadPDF() {
    const svgElement = document.querySelector('#svgContainer svg');
    if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('download.pdf');
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
}

function printSVG() {
    const svgElement = document.querySelector('#svgContainer svg');
    if (svgElement) {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Print SVG</title></head><body>');
        printWindow.document.write('<div>' + svgElement.outerHTML + '</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}