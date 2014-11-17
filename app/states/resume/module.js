
angular
    .module('resume', ['app-templates'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('resume', {
                url: '/?filter',
                views: {
                    'main': {
                        controller: 'ResumeCtrl as res',
                        templateUrl: 'states/resume/resume.html'
                    }
                }
            });
    })
    .value("resume", {
        "filter": [],
        "basics": {
            "name": "Travis Burandt",
            "label": "Programmer",
            "picture": "",
            "github": "TravisBurandt",
            "email": "travis.burandt@gmail.com",
            "phone": "(281) 798-0497",
            "website": "travisburandt.github.io", // without "http://"
            "stars": [
                "JavaScript",
                "AngularJS",
                "NodeJS",
                "PHP",
                "Git"
            ]
        },
        "skills": [
            {
                "name": "Proficient Languages",
                "keywords": [
                    "JavaScript",
                    "PHP",
                    "HTML",
                    "CSS"
                ]
            },
            {
                "name": "Familiar Languages",
                "keywords": [
                    "ES6",
                    "Java",
                    "SQL"
                ]
            },
            {
                "name": "Technical",
                "keywords": [
                    "AngularJS",
                    "Gulp",
                    "Grunt",
                    "Lodash",
                    "Sass",
                    "Twitter Bootstrap",
                    "jQuery",
                    "Sails",
                    "Express",
                    "Koa",
                    "ActionHero",
                    "Sencha Touch",
                    "Ember",
                    "Meteor",
                    "Cross Browser",
                    "SEO",
                    "Yii"
                ]
            },
            {
                "name": "Stores",
                "keywords": [
                    "Local Storage",
                    "PostgreSQL",
                    "MySQL / MariaDB",
                    "Redis"
                ]
            }
        ],
        "experience": [
            {
                "title": "PASSFB - Football Scheduling",
                "company": "Atomic Axis",
                "position": "Full Stack Developer",
                "startDate": "Jul. 2014",
                "endDate": "Aug. 2014",
                "highlights": [
                    "Complete rewrite of existing jQuery single page application to AngularJS.",
                    "Advanced report scheduling dictated by the backend but flexible enough to handle basic filtering and sorting. A keen focus on moving business logic to the backend to reduce our overall footprint from web to mobile devices throughout the application.",
                    "Attention to detail ",
                    "http://www.passfb.com"
                ],
                "keywords": [
                    "MySQL / MariaDB",
                    "Local Storage",
                    "Express",
                    "Twitter Bootstrap",
                    "Sass",
                    "Lodash",
                    "HTML",
                    "CSS",
                    "Gulp",
                    "Git",
                    "PHP",
                    "NodeJS",
                    "AngularJS",
                    "JavaScript"
                ]
            },
            {
                "title": "DocbookMD - Registration",
                "company": "Atomic Axis",
                "position": "Full Stack Developer",
                "duration": "2 Weeks",
                "highlights": [
                    "Overhauled existing problematic registration system collaborating with stakeholders and our in house designers throughout design comps and development.",
                    "Seven step registration process including physician directory search, contact info confirmation, knowledge based authentication (BKA), signature agreement, password creation, and login.",
                    "https://registration.docbookmd.com"
                ],
                "keywords": [
                    "MySQL / MariaDB",
                    "ES6",
                    "Cross Browser",
                    "Express",
                    "Twitter Bootstrap",
                    "Sass",
                    "Lodash",
                    "HTML",
                    "CSS",
                    "Gulp",
                    "Git",
                    "NodeJS",
                    "AngularJS",
                    "JavaScript"
                ]
            },
            {
                "title": "DocbookMD - Web",
                "company": "Atomic Axis",
                "position": "Full Stack Developer",
                "startDate": "Apr. 2014",
                "endDate": "Jul. 2014",
                "highlights": [
                    "DocbookMD's flagship product for the web. A one to one representation to their existing mobile applications. Great attention to detail to ensure the same experience functionally and visually from mobile to web and back.",
                    "",
                    "Cross browser down to Windows XP / IE8 support across all DocbookMD products.",
                    "https://webapp.docbookmd.com"
                ],
                "keywords": [
                    "MySQL / MariaDB",
                    "Cross Browser",
                    "Express",
                    "jQuery",
                    "Twitter Bootstrap",
                    "Sass",
                    "Lodash",
                    "HTML",
                    "CSS",
                    "Gulp",
                    "Git",
                    "NodeJS",
                    "AngularJS",
                    "JavaScript"
                ]
            },
            {
                "title": "DocbookMD - Paging",
                "company": "Atomic Axis",
                "position": "Full Stack Developer",
                "startDate": "Feb. 2014",
                "endDate": "Mar. 2014",
                "highlights": [
                    "One way bulk message composition and dispatching to a network of web and mobile devices via sockets, tasks, and push notifications. Implementing audit logs, progress indicators, and message tracking tools to ensure critical messages were sent in a timely and efficient manner.",
                    "Inherited from a former employee completed and maintained project.",
                    "https://oneway.docbookmd.com"
                ],
                "keywords": [
                    "MySQL / MariaDB",
                    "Cross Browser",
                    "Express",
                    "jQuery",
                    "Twitter Bootstrap",
                    "Sass",
                    "HTML",
                    "CSS",
                    "Gulp",
                    "Git",
                    "NodeJS",
                    "AngularJS",
                    "JavaScript"
                ]
            },
            {
                "title": "Discussion Forums Web Software",
                "company": "Hobby",
                "position": "Full Stack Developer",
                "startDate": "Nov. 2013",
                "endDate": "Current",
                "highlights": [
                    "https://github.com/discusstron/discusstron"
                ],
                "keywords": [
                    "Redis",
                    "PostgreSQL",
                    "Local Storage",
                    "ES6",
                    "Ember",
                    "Meteor",
                    "Sails",
                    "Express",
                    "Koa",
                    "ActionHero",
                    "Twitter Bootstrap",
                    "Lodash",
                    "HTML",
                    "CSS",
                    "Grunt",
                    "Git",
                    "NodeJS",
                    "AngularJS",
                    "JavaScript"
                ]
            },
            {
                "title": "Startup Group Fitness Web Application",
                "company": "Gritness, Inc.",
                "position": "Full Stack Developer",
                "startDate": "Apr. 2013",
                "endDate": "Nov. 2013",
                "highlights": [
                    "Full stack developer from the backend to UI/UX including future state and business decisions.",
                    "Using the Stripe payments API developed a complete payment system with shopping cart, invoices, fees, discounts, bank transfers, and an admin control panel to manage it all.",
                    "Full AJAX such as modal drop downs, partials, form validation, and X-editable.",
                    "Also implementing user profiles, settings, groups, activities, and dashboard.",
                    "https://app.gritness.com"
                ],
                "keywords": [
                    "MySQL / MariaDB",
                    "SQL",
                    "Yii",
                    "Cross Browser",
                    "jQuery",
                    "Twitter Bootstrap",
                    "HTML",
                    "CSS",
                    "Git",
                    "PHP",
                    "JavaScript"
                ]
            },
            {
                "title": "Lonestar / Austin Community College",
                "company": "School",
                "position": "Full Stack Developer",
                "startDate": "Aug. 2011",
                "endDate": "May 2013",
                "highlights": [
                    "Computer programming fundamentals I, II, and III."
                ],
                "keywords": [
                    "Git",
                    "Java"
                ]
            },
            {
                "title": "SaaS Field Service Web Application",
                "company": "Powertrade Services, LLC",
                "position": "Full Stack Developer",
                "startDate": "Dec. 2011",
                "endDate": "Apr. 2012",
                "highlights": [
                    "Started the design and development of website and application using Twitter Bootstrap and Yii.",
                    "Approximately 50 tables. Developed tenant login/authentication, customer portfolios, administration panel, user ACL, and the invoice/billing/work order interfaces."
                ],
                "keywords": [
                    "PostgreSQL",
                    "SQL",
                    "Yii",
                    "jQuery",
                    "Twitter Bootstrap",
                    "HTML",
                    "CSS",
                    "Git",
                    "PHP",
                    "JavaScript"
                ]
            },
            {
                "title": "Mobile Applications",
                "company": "Hobby",
                "position": "Full Stack Developer",
                "startDate": "2010",
                "endDate": "2011",
                "highlights": [
                    "(Gears of War 3 guide) Developed a Sencha Touch app which gave users the ability to add, like, comment, and rate guides. Data and authentication was handled by an API backend that integrated with IPB community software (PHP/MySQL).",
                    "(Crysis 2 Guide: Pro Edition) With a static page generator created a 200 page jQuery Mobile app from a SQLite database using JavaScript."
                ],
                "keywords": [
                    "MySQL / MariaDB",
                    "SQL",
                    "Sencha Touch",
                    "jQuery",
                    "HTML",
                    "CSS",
                    "PHP",
                    "JavaScript"
                ]
            },
            {
                "title": "Online Gaming Community",
                "company": "Hobby",
                "position": "Full Stack Developer",
                "startDate": "Mar. 2008",
                "endDate": "2011",
                "highlights": [
                    "Created 20k member community gaming website, halotracks.org. Producing the most popular Halo3-4 gametype and roughly 5,000 maps with over 20 million downloads.",
                    "Integrating with bungie.net's public API overhauled existing IPB Gallery plugin to allow direct downloads and statistics.",
                    "Learned the basics of creating, hosting, and maintaining LAMP."
                ],
                "keywords": [
                    "MySQL / MariaDB",
                    "SQL",
                    "SEO",
                    "jQuery",
                    "HTML",
                    "CSS",
                    "PHP",
                    "JavaScript"
                ]
            }
        ],
        "community": [
            {
                "title": "Cycling",
                "description": "Podium at major domestic and international events. Member of the USA National Team 17-18 and under 23 age groups. Current team member of Jack & Adam's Racing Team and community volunteer."
            },
            {
                "title": "Nerd",
                "description": "Proactive reconnaissance with the latest and greatest. Meetups, webinars, news letters, Github, Stack Overflow, etc."
            }
        ]
    });