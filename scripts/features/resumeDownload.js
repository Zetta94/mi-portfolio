const RESUME_PATH = 'files/Currículum Manuel Zuñiga 2026.pdf';

function getPoint(point, index, points, smoothing) {
  const controlPoint = (current, previous, next, reverse) => {
    const previousPoint = previous || current;
    const nextPoint = next || current;
    const line = {
      length: Math.sqrt(Math.pow(nextPoint[0] - previousPoint[0], 2) + Math.pow(nextPoint[1] - previousPoint[1], 2)),
      angle: Math.atan2(nextPoint[1] - previousPoint[1], nextPoint[0] - previousPoint[0])
    };
    const angle = line.angle + (reverse ? Math.PI : 0);
    const length = line.length * smoothing;
    return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
  };

  const cps = controlPoint(points[index - 1], points[index - 2], point, false);
  const cpe = controlPoint(point, points[index - 1], points[index + 1], true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
  const points = pointsNew || [
    [4, 12],
    [12, update],
    [20, 12]
  ];

  return points.reduce((accumulator, point, index, allPoints) => {
    return index === 0
      ? `M ${point[0]},${point[1]}`
      : `${accumulator} ${getPoint(point, index, allPoints, smoothing)}`;
  }, '');
}

export function initResumeDownload() {
  document.querySelectorAll('.resume-button').forEach((button) => {
    if (typeof window.gsap === 'undefined') {
      return;
    }

    const svg = button.querySelector('svg');
    if (!svg) {
      return;
    }

    const duration = 3000;
    const svgPath = new Proxy({ y: null, smoothing: null }, {
      set(target, key, value) {
        target[key] = value;
        if (target.y !== null && target.smoothing !== null) {
          svg.innerHTML = `<path d="${getPath(target.y, target.smoothing, null)}" />`;
        }
        return true;
      },
      get(target, key) {
        return target[key];
      }
    });

    button.style.setProperty('--duration', duration);
    svgPath.y = 20;
    svgPath.smoothing = 0;

    button.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.classList.contains('open-file')) {
        const link = document.createElement('a');
        link.href = RESUME_PATH;
        link.download = 'Curriculum-Manuel-Zuniga-2026.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      if (button.classList.contains('loading')) {
        return;
      }

      button.classList.add('loading');

      gsap.to(svgPath, {
        smoothing: 0.3,
        duration: duration * 0.065 / 1000
      });

      gsap.to(svgPath, {
        y: 12,
        duration: duration * 0.265 / 1000,
        delay: duration * 0.065 / 1000,
        ease: Elastic.easeOut.config(1.12, 0.4)
      });

      setTimeout(() => {
        svg.innerHTML = '<path d="M 3,14 C 4.666666666666666,15.666666666666666 6.333333333333333,17.333333333333332 8,19 C 12.333333333333332,14.666666666666668 16.666666666666664,10.333333333333334 21,6" />';
      }, duration / 2);
    });
  });
}