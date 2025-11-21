document.addEventListener("DOMContentLoaded", () => {
    const line = document.getElementById("progress-line");
    const dots = document.querySelectorAll(".timeline-dot");

    if (!line || dots.length === 0) return;

    function updateLine() {
        // Calculate vertical center of first and last dot
        const firstDot = dots[0].getBoundingClientRect().top + window.scrollY + dots[0].offsetHeight / 2;
        const lastDot = dots[dots.length - 1].getBoundingClientRect().top + window.scrollY + dots[dots.length - 1].offsetHeight / 2;

        const scrollY = window.scrollY;
        const viewportBottom = scrollY + window.innerHeight;

        let targetHeight = viewportBottom - firstDot;

        // Clamp line height to not exceed last dot
        if (targetHeight < 0) targetHeight = 0;
        if (targetHeight > lastDot - firstDot) targetHeight = lastDot - firstDot;

        let currentHeight = parseFloat(line.style.height) || 0;
        const fallSpeed = 0.12;

        function animateFall() {
            currentHeight += (targetHeight - currentHeight) * fallSpeed;
            line.style.height = currentHeight + "px";
            if (Math.abs(currentHeight - targetHeight) > 0.5) {
                requestAnimationFrame(animateFall);
            }
        }

        requestAnimationFrame(animateFall);

        // Align line top with first dot
        line.style.top = firstDot + "px";
    }

    document.addEventListener("scroll", updateLine);
    window.addEventListener("resize", updateLine);
    updateLine();
});
