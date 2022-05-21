const printJSON = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  fillPageContent(data);
};

const fillPageContent = (data) => {
  fillHeaderContent(data.page_title);
  fillPackagesContent(data.plans);
  fillNavLinksContent(data.tabs);
};

const fillHeaderContent = (title) => {
  document.title = title;
  const header = document.querySelector("header");
  header.querySelector(".main-heading").innerText = title;
};

const fillPackagesContent = (plans) => {
  const packages = document.querySelectorAll(".packages__item");
  plans.forEach((plan, i) => {
    packages[i].querySelector(".packages__name").innerText = plan.name;
    if (plan.active) packages[i].classList.add("packages__item_active");
  });
};

const fillNavLinksContent = (navLinks) => {
  const links = document.querySelectorAll(".navigation__links_text_style");
  navLinks.forEach((navLink, i) => {
    links[i].innerText = navLink.title;
    if (Object.keys(navLink.data).length) renderSystemsContent(navLink.data);
  });
};

const renderSystemsContent = (allSystems) => {
  const { systems, subsystems } = allSystems;
  const systemTables = document.querySelectorAll(".system-table");
  const systemNestedTables = document.querySelectorAll(".systems-table_nested");

  systems.forEach((system, i) => {
    systemTables[i].querySelector(".system-name").innerHTML +=
      system.system_name;
    systemTables[i].querySelector(".system-id").innerText = system.id;
    systemTables[i].querySelector(".system-date").innerText =
      system.created_date;
    systemTables[i].querySelector(".system-licenses").innerText =
      system.active_licenses;
  });
  subsystems.forEach((subsystem, i) => {
    if (systemNestedTables[i]) {
      systemNestedTables[i].querySelector(".nested-system-name").innerText =
        subsystem.licenses;
      systemNestedTables[i].querySelector(".nested-system-date").innerText =
        subsystem.expires;
    }
  });
};

window.addEventListener("load", printJSON());
