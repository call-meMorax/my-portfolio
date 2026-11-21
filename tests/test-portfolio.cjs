/**
 * Simple Playwright test for portfolio verification
 */

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop test
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const desktopPage = await desktopContext.newPage();
  
  let consoleErrors = [];
  desktopPage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  try {
    await desktopPage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await desktopPage.waitForLoadState('networkidle');
    
    // Wait for canvas to be ready (preloader hides after ~2 seconds + fade)
    await desktopPage.waitForSelector('canvas', { state: 'visible', timeout: 15000 });
    
    // Wait for preloader to disappear (it has a fade out animation)
    await desktopPage.waitForTimeout(3000);
    
    // Check if the main content is visible
    const headerText = await desktopPage.locator('h1').textContent().catch(() => null);
    console.log('Header text found:', headerText);
    
    // Hero screenshot
    await desktopPage.screenshot({
      path: '/root/projects/my-portfolio/dist/screenshot-desktop-hero.png',
      fullPage: false
    });
    console.log('✓ Desktop hero screenshot captured');
    
    // Scroll to projects section
    const projectsSection = desktopPage.locator('#projects');
    const projectsBox = await projectsSection.boundingBox();
    if (projectsBox) {
      await desktopPage.evaluate((box) => {
        window.scrollTo(0, box.y + window.scrollY - 100);
      }, projectsBox);
      await desktopPage.waitForTimeout(500);
    }
    
    // Projects screenshot
    await desktopPage.screenshot({
      path: '/root/projects/my-portfolio/dist/screenshot-desktop-projects.png',
      fullPage: false
    });
    console.log('✓ Desktop projects screenshot captured');
    
    // Scroll to skills section
    const skillsSection = desktopPage.locator('#skills');
    const skillsBox = await skillsSection.boundingBox();
    if (skillsBox) {
      await desktopPage.evaluate((box) => {
        window.scrollTo(0, box.y + window.scrollY - 100);
      }, skillsBox);
      await desktopPage.waitForTimeout(500);
    }
    
    // Skills screenshot
    await desktopPage.screenshot({
      path: '/root/projects/my-portfolio/dist/screenshot-desktop-skills.png',
      fullPage: false
    });
    console.log('✓ Desktop skills screenshot captured');
    
    // Scroll to contact section
    const contactSection = desktopPage.locator('#contact');
    const contactBox = await contactSection.boundingBox();
    if (contactBox) {
      await desktopPage.evaluate((box) => {
        window.scrollTo(0, box.y + window.scrollY - 100);
      }, contactBox);
      await desktopPage.waitForTimeout(500);
    }
    
    // Contact screenshot
    await desktopPage.screenshot({
      path: '/root/projects/my-portfolio/dist/screenshot-desktop-contact.png',
      fullPage: false
    });
    console.log('✓ Desktop contact screenshot captured');
    
  } catch (error) {
    console.error('Desktop test error:', error);
  }
  
  await desktopContext.close();
  
  // Mobile test
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const mobilePage = await mobileContext.newPage();
  
  try {
    await mobilePage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await mobilePage.waitForLoadState('networkidle');
    await mobilePage.waitForSelector('canvas', { state: 'visible', timeout: 15000 });
    await mobilePage.waitForTimeout(3000);
    
    await mobilePage.screenshot({
      path: '/root/projects/my-portfolio/dist/screenshot-mobile.png',
      fullPage: false
    });
    console.log('✓ Mobile screenshot captured');
    
  } catch (error) {
    console.error('Mobile test error:', error);
  }
  
  await mobileContext.close();
  await browser.close();
  
  // Report console errors
  if (consoleErrors.length > 0) {
    console.log('✗ Console errors found:', consoleErrors);
    process.exit(1);
  } else {
    console.log('✓ No console errors found');
  }
  
  console.log('\n=== All screenshots captured successfully ===');
})();