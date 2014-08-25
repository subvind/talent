
angular
    .module('resume', ['app-templates'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('resume', {
                url: '/',
                views: {
                    'main': {
                        controller: 'ResumeCtrl as res',
                        templateUrl: 'states/resume/resume.html'
                    }
                }
            });
    })
    .value("resume", {
        "basics": {
            "name": "Travis Burandt",
            "label": "Programmer",
            "picture": "",
            "github": "TravisBurandt",
            "email": "travis.burandt@gmail.com",
            "phone": "(281) 798-0497",
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
                    "Angular",
                    "Gulp",
                    "HTTP",
                    "REST",
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
                    "AJAX",
                    "Yii"
                ]
            },
            {
                "name": "Stores",
                "keywords": [
                    "Relational",
                    "Local Storage",
                    "key-value",
                    "Graph"
                ]
            }
        ],
        "experience": [
            {
                "title": "PASSFB - Football Scheduling",
                "company": "Atomic Axis",
                "position": "Full Stack Developer",
                "website": "http://passfb.com",
                "startDate": "Jul. 2014",
                "endDate": "Aug. 2014",
                "highlights": [
                    "passfb."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "DocbookMD - Registration",
                "company": "Atomic Axis",
                "position": "Full Stack Developer",
                "website": "http://passfb.com",
                "duration": "2 Weeks",
                "highlights": [
                    "docbook."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "DocbookMD - Web",
                "company": "Atomic Axis",
                "position": "Full Stack Developer",
                "website": "http://passfb.com",
                "startDate": "Apr. 2014",
                "endDate": "Jul. 2014",
                "highlights": [
                    "docbook."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "DocbookMD - Paging",
                "company": "Atomic Axis",
                "position": "Full Stack Developer",
                "website": "http://passfb.com",
                "startDate": "Feb. 2014",
                "endDate": "Mar. 2014",
                "highlights": [
                    "One way bulk message composition and dispatching to a network of web and mobile devices via sockets, tasks, and push notifications. Implementing audit logs, progress indicators, and message tracking tools to ensure critical messages were sent in a timely and efficient manner.",
                    "Inherited from a former employee completed and maintained project.",
                    "Maintenance and updates"
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "Discussion Forums Web Software",
                "company": "Hobby",
                "position": "Full Stack Developer",
                "website": "http://passfb.com",
                "startDate": "Nov. 2013",
                "endDate": "Jan. 2014",
                "highlights": [
                    "ogithub...."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "Startup Group Fitness Web Application",
                "company": "Gritness, Inc.",
                "position": "Full Stack Developer",
                "website": "http://gritness.com",
                "startDate": "Apr. 2013",
                "endDate": "Nov. 2013",
                "highlights": [
                    "Full stack developer from the backend to UI/UX including future state and business decisions.",
                    "Using the Stripe payments API developed a complete payment system with shopping cart, invoices, fees, discounts, bank transfers, and an admin control panel to manage it all.",
                    "Full AJAX such as modal drop downs, partials, form validation, and X-editable.",
                    "Also implementing user profiles, settings, groups, activities, and dashboard."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "Lonestar / Austin Community College",
                "company": "School",
                "position": "Full Stack Developer",
                "website": "",
                "startDate": "Aug. 2011",
                "endDate": "May 2013",
                "highlights": [
                    "Computer programming fundamentals I, II, and III."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "SaaS Field Service Web Application",
                "company": "Powertrade Services, LLC",
                "position": "Full Stack Developer",
                "website": "http://powertrade.com",
                "startDate": "Dec. 2011",
                "endDate": "Apr. 2012",
                "highlights": [
                    "Started the design and development of website and application using Twitter Bootstrap and Yii.",
                    "Approximately 50 tables. Developed tenant login/authentication, customer area, settings, user roles/permissions, and the invoice/billing/work order area."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "Mobile Applications",
                "company": "Hobby",
                "position": "Full Stack Developer",
                "website": "",
                "startDate": "2010",
                "endDate": "2011",
                "highlights": [
                    "(Gears of War 3 guide) Developed a Sencha Touch app which gave users the ability to add, like, comment, and rate guides. Data and authentication was handled by an API backend that integrated with IPB community software (PHP/MySQL).",
                    "(Crysis 2 Guide: Pro Edition) With a static page generator created a 200 page jQuery Mobile app from a SQLite database using JavaScript."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            },
            {
                "title": "Online Gaming Community",
                "company": "Hobby",
                "position": "Full Stack Developer",
                "website": "",
                "startDate": "Mar. 2008",
                "endDate": "2011",
                "highlights": [
                    "Created 20k member community gaming website, halotracks.org. Producing the most popular Halo3-4 gametype and roughly 5,000 maps with over 20 million downloads.",
                    "Overhauled existing IPB Gallery plugin as an  integrated with bungie.net's public API.",
                    "Learned the basics of creating, hosting, and maintaining LAMP."
                ],
                "keywords": [
                    "jQuery",
                    "MySQL"
                ]
            }
        ],
        "extra": [
            {
                "title": "Cycling",
                "description": "Podium at major domestic and international events. Member of the USA National Team 17-18 and under 23 age groups."
            },
            {
                "title": "Nerd",
                "description": "Proactive reconnaissance with the latest and greatest. Meetups, webinars, news letters, Github, Stack Overflow, etc."
            }
        ]
    });