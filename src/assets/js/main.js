// Add your javascript here

window.darkMode = false;

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
const stickyClassesContainer = [
	"border-neutral-300/50",
	"bg-white/80",
	"dark:border-neutral-600/40",
	"dark:bg-neutral-900/60",
	"backdrop-blur-2xl",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

document.addEventListener("DOMContentLoaded", () => {
	headerElement = document.getElementById("header");

	if (
		localStorage.getItem("dark_mode") &&
		localStorage.getItem("dark_mode") === "true"
	) {
		window.darkMode = true;
		showNight();
		document.body.classList.add("dark-mode");
		document.body.classList.remove("light-mode");
	} else {
		showDay();
		document.body.classList.add("light-mode");
		document.body.classList.remove("dark-mode");
	}

	stickyHeaderFuncionality();
	applyMenuItemClasses();
	evaluateHeaderPosition();
	mobileMenuFunctionality();

	// Detectar cambio de modo oscuro y actualizar colores dinámicamente
	document.getElementById("darkToggle").addEventListener("click", () => {
		setTimeout(() => {
			if (localStorage.getItem("dark_mode") === "true") {
				document.body.classList.add("dark-mode");
				document.body.classList.remove("light-mode");
			} else {
				document.body.classList.add("light-mode");
				document.body.classList.remove("dark-mode");
			}
		}, 100);
	});
});

window.stickyHeaderFuncionality = () => {
	window.addEventListener("scroll", () => {
		evaluateHeaderPosition();
	});
};

window.evaluateHeaderPosition = () => {
	if (window.scrollY > 16) {
		headerElement.firstElementChild.classList.add(...stickyClassesContainer);
		headerElement.firstElementChild.classList.remove(
			...unstickyClassesContainer,
		);
		headerElement.classList.add(...stickyClasses);
		headerElement.classList.remove(...unstickyClasses);
		document.getElementById("menu").classList.add("top-[56px]");
		document.getElementById("menu").classList.remove("top-[75px]");
	} else {
		headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
		headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
		headerElement.classList.add(...unstickyClasses);
		headerElement.classList.remove(...stickyClasses);
		document.getElementById("menu").classList.remove("top-[56px]");
		document.getElementById("menu").classList.add("top-[75px]");
	}
};

document.getElementById("darkToggle").addEventListener("click", () => {
	document.documentElement.classList.add("duration-300");

	if (document.documentElement.classList.contains("dark")) {
		localStorage.removeItem("dark_mode");
		showDay(true);
	} else {
		localStorage.setItem("dark_mode", true);
		showNight(true);
	}
});

function showDay(animate) {
	document.getElementById("sun").classList.remove("setting");
	document.getElementById("moon").classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;

		document.getElementById("moon").classList.add("setting");
	}

	setTimeout(() => {
		document.getElementById("dayText").classList.remove("hidden");
		document.getElementById("nightText").classList.add("hidden");

		document.getElementById("moon").classList.add("hidden");
		document.getElementById("sun").classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.remove("dark");
			document.getElementById("sun").classList.add("rising");
		}
	}, timeout);
}

function showNight(animate) {
	document.getElementById("moon").classList.remove("setting");
	document.getElementById("sun").classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;

		document.getElementById("sun").classList.add("setting");
	}

	setTimeout(() => {
		document.getElementById("nightText").classList.remove("hidden");
		document.getElementById("dayText").classList.add("hidden");

		document.getElementById("sun").classList.add("hidden");
		document.getElementById("moon").classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.add("dark");
			document.getElementById("moon").classList.add("rising");
		}
	}, timeout);
}

window.applyMenuItemClasses = () => {
	const menuItems = document.querySelectorAll("#menu a");
	for (let i = 0; i < menuItems.length; i++) {
		if (menuItems[i].pathname === window.location.pathname) {
			menuItems[i].classList.add("text-neutral-900", "dark:text-white");
		}
	}
	//:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
};

function mobileMenuFunctionality() {
	document.getElementById("openMenu").addEventListener("click", () => {
		openMobileMenu();
	});

	document.getElementById("closeMenu").addEventListener("click", () => {
		closeMobileMenu();
	});
}

window.openMobileMenu = () => {
	document.getElementById("openMenu").classList.add("hidden");
	document.getElementById("closeMenu").classList.remove("hidden");
	document.getElementById("menu").classList.remove("hidden");
	document.getElementById("mobileMenuBackground").classList.add("opacity-0");
	document.getElementById("mobileMenuBackground").classList.remove("hidden");

	setTimeout(() => {
		document
			.getElementById("mobileMenuBackground")
			.classList.remove("opacity-0");
	}, 1);
};

window.closeMobileMenu = () => {
	document.getElementById("closeMenu").classList.add("hidden");
	document.getElementById("openMenu").classList.remove("hidden");
	document.getElementById("menu").classList.add("hidden");
	document.getElementById("mobileMenuBackground").classList.add("hidden");
};

window.copyEmail = (email, buttonElement) => {
	navigator.clipboard.writeText(email).then(() => {
		showTooltip(buttonElement, "Correo copiado!");
	});
};

function showTooltip(buttonElement, message) {
	const tooltip = document.createElement("div");
	tooltip.textContent = message;

	tooltip.className = `absolute z-50 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900
  text-xs py-1 px-3 rounded-lg shadow-lg whitespace-nowrap opacity-0 transition-opacity duration-200`;

	const rect = buttonElement.getBoundingClientRect();

	tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
	tooltip.style.top = `${rect.top + window.scrollY - rect.height - 20}px`;
	tooltip.style.transform = "translateX(-50%)";

	document.body.appendChild(tooltip);

	requestAnimationFrame(() => {
		tooltip.classList.replace("opacity-0", "opacity-100");
	});

	setTimeout(() => {
		tooltip.classList.replace("opacity-100", "opacity-0");
		setTimeout(() => tooltip.remove(), 200);
	}, 1500);
}
