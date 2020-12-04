const inquirer = require("inquirer");
const path = require ("path");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const output_Dir= path.resolve(__dirname, "output")
const outputPath = path.join(OutPut_Dir, "team.html");

const render =  require ("./lib/htmlRenderer");
const { create } = require("domain");


const teamMembers = [];

const idArray= [];

function appMenu () {

    function createManager() {
        console.log("Build your team here");

        inquirer.prompt ([
            {
                type:"input",
            name:"managerName",
            message:"Whats the name of the Manager?",
            validate: answer => {
                if (answer !== "") {
                    return true; 
                }
                return "Enter at least one character";
            }
            },
           
           
            {
                type:"input",
            name:"managerId",
            message:"Whats your managers' ID?",
            validate: answer => {
                const pass = answer.match (
                /^[1-9]\d$*/
               );
               if (pass) {
            return true; 
            }
            return "Enter a positive number greater than zero";
            }
        },


        {
            type:"input",
        name:"managerEmail",
        message:"Whats your managers' email?",
        validate: answer => {
            const pass = answer.match (
            /\S+@\S+\.\S+/
           );
           if (pass) {
        return true; 
        }
        return "Enter a valid email";
        }
    },


    {
        type:"input",
    name:"managerOfficeNumber",
    message:"Whats your managers' office number?",
    validate: answer => {
        const pass = answer.match (
        /^[1-9]\d$*/
       );
       if (pass) {
    return true; 
    }
    return "Enter a positive number greater than zero";
    }
},
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
   }

   function createTeam (){
     inquirer.prompt([
{
type: "list",
name:"memberType",
message: "What type of team member would you like to add?",
choices: [
    "Engineer",
    "Intern",
    "I dont want to add more team members"
]
}
     ]).then(userType => {
         switch(userType.memberType){
             case "Engineer":
                 addEngineer();
                 break;
                 default:
                     buildTeam;
         }
     });
}

function addEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the name of the Engineer?",
            validate:answer => {
                if (answer !== "") {
                    return true;

                }
                return"Please enter at least one character";
            }
        },
        
        {
            type: "input",
            name: "engineerId",
            message: "What is the Id of the Engineer?",
            validate:answer => {
                const pass = answer.match (
                    /^[1-9]\d*$/
                );

                if (pass){
                    if (idArray.includes (answer)){
                        return "This Id is already taken. Please choose a different number";

                    } else {
                        return true; 
                    }
                    }
                    return "Please enter a positive number greater than zero";
                }
        },

        
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the Email of the Engineer?",
            validate:answer => {
                const pass = answer.match (
                    /\S+@\S+\.\S+/
                );

                if (pass){
                    return true; 
                }
                return "Please enter valid email";
                }
        },


        {
            type: "input",
            name: "engineerGitHub",
            message: "What is the GitHub user name of the Engineer?",
            validate:answer => {
                if (answer !== "") {
                    return true; 
                }
                return "Please enter at least one character ";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
});
}

function addIntern (){
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the name of the Intern?",
            validate:answer => {
                if (answer !== "") {
                    return true;

                }
                return"Please enter at least one character";
            }
        },
        
        {
            type: "input",
            name: "internId",
            message: "What is the Id of the Intern?",
            validate:answer => {
                const pass = answer.match (
                    /^[1-9]\d*$/
                );

                if (pass){
                    if (idArray.includes (answer)){
                        return "This Id is already taken. Please choose a different number";

                    } else {
                        return true; 
                    }
                    }
                    return "Please enter a positive number greater than zero";
                }
        },

        {
            type: "input",
            name: "internEmail",
            message: "What is the Email of the Intern?",
            validate:answer => {
                const pass = answer.match (
                    /\S+@\S+\.\S+/
                );

                if (pass){
                    return true; 
                }
                return "Please enter valid email";
                }
        },


        {
            type: "input",
            name: "internSchool",
            message: "What is the school name of the Intern?",
            validate:answer => {
                if (answer !== "") {
                    return true; 
                }
                return "Please enter at least one character ";
                }
            }
        ]).then(answers => {
            const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();

        }
    );
}

function buildTeam(){
    if (!fs.existsSync(output_Dir)){
        fs.mkdirSync(output_Dir)
    }
    fs.writeFileSync(outputPath, render (teamMembers), "utf-8");
}
createManager();
} 

appMenu();













function promptUserManager() {
   return inquirer.prompt([
        {
            type:"input",
            name:"nameManager",
            message:"Whats your Name?"
        },
        {
            type:"input",
            name:"idManager",
            message:"Whats your ID?"
        },
        {
            type:"input",
            name:"emailManager",
            message:"Whats your Email?"
        },
        {
            type:"input",
            name:"officeNumberManager",
            message:"Whats your Office Number?"
        },
        {
            type:"input",
            name:"memberCountEngineer",
            message:"How Many Engineers are on the Team?"
        },
        {
            type:"input",
            name:"memberCountIntern",
            message:"How Many Interns are on the Team?"
        }
    ])
}

function promptUserEngineer() 
{
   return inquirer.prompt([
    {
        type:"input",
        name:"nameEngineer",
        message:"Whats the Engineers Name?"
    },
    {
        type:"input",
        name:"idEngineer",
        message:"Whats their ID?"
    },
    {
        type:"input",
        name:"emailEngineer",
        message:"Whats their Email?"
    },
    {
        type:"input",
        name:"githubEngineer",
        message:"Whats their Github?"
    }
    ])
}

function promptUserIntern() {
   return inquirer.prompt([
    {
        type:"input",
        name:"nameIntern",
        message:"Whats the Interns Name?"
    },

    {
        type:"input",
        name:"idIntern",
        message:"Whats their ID?"
    },

    {
        type:"input",
        name:"emailIntern",
        message:"Whats their Email?"
    },

    {
        type:"input",
        name:"schoolIntern",
        message:"Whats their School?"
    }
])
}

function populateHTML(manager, engineer, intern){
    console.log(manager)
   
    console.log(intern)
    
    let empty = ` `;
    let bodyEngineer = ` `;
    let bodyIntern = ` `;
    
    let bodyManager = `
    <div> 
        <div class="uk-card uk-card-default">
            <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                        <span uk-icon="icon: user"></span>
                    </div>
                    <div class="uk-width-expand">
                        <h3 class="uk-card-title uk-margin-remove-bottom">${manager.name}</h3>
                        <p class="uk-text-meta uk-margin-remove-top">${manager.getRole()}</p>
                    </div>
                </div>
            </div>
            <div class="uk-card-body uk-background-muted">
                <p>ID: ${manager.id}</p>
                <p>Email:<a>${manager.email}</a></p>
                <p>Office Number: ${manager.officeNumber}</p>                           
            </div>
        </div>
    </div>`

    for(var i = 0; i < engineer.length; i++){
        empty = `
        <div> 
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <span uk-icon="icon: cog"></span>
                        </div>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom">${engineer[i].name}</h3>
                            <p class="uk-text-meta uk-margin-remove-top">${engineer[i].getRole()}</p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body uk-background-muted">
                    <p>ID: ${engineer[i].id}</p>
                    <p>Email: <a>${engineer[i].email}</a></p>
                    <p>GitHub: ${engineer[i].github}</p>                           
                </div>
            </div>
        </div>`
        bodyEngineer += empty;
    }

    for(var i = 0; i < intern.length; i++){
        empty = `
        <div> 
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <span uk-icon="icon: users"></span>
                        </div>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom">${intern[i].name}</h3>
                            <p class="uk-text-meta uk-margin-remove-top">${intern[i].getRole()}</p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body uk-background-muted">
                    <p>ID: ${intern[i].id}</p>
                    <p>Email: <a>${intern[i].email}</a></p>
                    <p>School: ${intern[i].school}</p>                           
                </div>
            </div>
        </div>`
        bodyIntern += empty;
    }

    return `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Page</title>

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.3.3/dist/css/uikit.min.css" />

    <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.3.3/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.3.3/dist/js/uikit-icons.min.js"></script>

    </head>
    <body>
        <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-center">
                <ul class="uk-navbar-nav">
                    <li class="uk-active"><h1>Team Page</h1></li>
                </ul>
            </div>
        </nav>
        
        <div class="uk-section">
            <div class="uk-container-large">
                <div class="uk-child-width-1-4@s uk-grid-match" uk-grid>`
        + bodyManager 
        + bodyEngineer 
        + bodyIntern 
        +`</div>
        </div>
        </div>
    </body>
</html>`
}

function writeHTML(newHTML){
    fs.writeFile("./output/teampage.html", newHTML, "utf8", (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
}


async function init(){
    const newEngineers = []
    const newInterns = []
    
    const promptManager = await promptUserManager()

    const newManager = new Manager(promptManager.nameManager, promptManager.idManager, promptManager.emailManager, promptManager.officeNumberManager)
    
    if(!/[a-z]/i.test(promptManager.memberCountEngineer) === true){
        for(var i = 0; i < promptManager.memberCountEngineer; i++){
            const promptEngineer = await promptUserEngineer()
            
            newEngineers.push(new Engineer(promptEngineer.nameEngineer, promptEngineer.idEngineer, promptEngineer.emailEngineer, promptEngineer.githubEngineer));
            
        }
    } else {
        console.log("wrong")
    }
    
    if(!/[a-z]/i.test(promptManager.memberCountIntern) === true){
        for(var i = 0; i < promptManager.memberCountIntern; i++){
            const promptIntern = await promptUserIntern()
            newInterns.push(new Intern(promptIntern.nameIntern, promptIntern.idIntern, promptIntern.emailIntern, promptIntern.schoolIntern))    
        }
    } else {
        console.log("wrong")
    }


    const newHTML = populateHTML(newManager, newEngineers, newInterns)

    writeHTML(newHTML)
}

init()



