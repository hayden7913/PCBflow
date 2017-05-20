export const tutorialSteps = [
  {
    text: 'Welcome to PCBflow! \n Would you like to take a quick tutorial?',
    nextButtonText: 'Start',
    shouldRenderBackButton: true,
    backButtonText: 'No Thanks',
  },
  {
    text: 'In this tutorial we\'ll build a Home Theatre PC device which can be conntected to a tv or monitor to play media from a mass storage device using a smart phone as a remote control. ',
    nextButtonText: 'Next',
    shouldRenderBackButton: true,
    backButtonText: 'Back',
    image: {src: null, alt: 'image of completed project'},
    imageClassName: 'completed-tutorial-project' 
  },
  {
    text: 'First let\'s take a short tour...',
    nextButtonText: 'Okay',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'Okay, now we\'re ready to get started! \n First drag and drop the COM connector module anywhere on the board',
    nextButtonText: 'Okay',
    nextButtonClass: 'com-connector-tooltip',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'Nice! The COM or \'computer on module\' component will act as the control center for our HTPC. It is quite literally a computer which runs a linux or android operating system.\n The COM has a wide range of interfacing capabilities including: ',
    list: ['WiFi','HDMI','USB', 'Audio', 'Ethernet', 'RGB'],
    nextButtonText: 'Next',
    shouldRenderBackButton: false,
    backButtonText: 'Back'
  },
  {
    text: 'So which module should we add next? Let\'s take a look at the module pallate for some insight.',
    nextButtonText: 'Okay',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: '(Render tooltip pointing to module pallate with the following text...) \n Some modules are depndent other specific modules to function. When you add a module that has unmet dependencies, those dependencies will be listed in the module pallate'
    nextButtonText: 'Okay',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: '(New tooltip points to module pallate with the following text...)'
    nextButtonText: 'Okay',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  
]