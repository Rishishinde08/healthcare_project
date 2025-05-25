        // Hospital data
        const hospitals = [
        {
                id: 1,
                name: "All India Institute of Medical Sciences (AIIMS)",
                location: "New Delhi",
                specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
                website: "https://www.aiims.edu",
                beds: "2500+",
                established: 1956,
                image: "/assets/All India Institute of Medical Sciences (AIIMS).jpg",
                tags: "government cardiology neurology orthopedics pediatrics"
            },
            {
                id: 2,
                name: "PGIMER - Postgraduate Institute of Medical Education & Research",
                location: "Chandigarh",
                specialties: ["Cardiology", "Neurology", "Oncology", "Transplant"],
                website: "http://pgimer.edu.in",
                beds: "1948",
                established: 1962,
                image: "/assets/PGIMER - Postgraduate Institute of Medical Education & Research.webp",
                tags: "government multi specialty"
            },
            {
                id: 3,
                name: "JIPMER - Jawaharlal Institute of Postgraduate Medical Education & Research",
                location: "Puducherry",
                specialties: ["General Medicine", "Surgery", "Cardiology", "Pediatrics"],
                website: "https://jipmer.edu.in",
                beds: "2000",
                established: 1823,
                image: "/assets/JIPMER - Jawaharlal Institute of Postgraduate Medical Education & Research.jpg",
                tags: "government general surgery"
            },
            {
                id: 4,
                name: "NIMHANS - National Institute of Mental Health and Neurosciences",
                location: "Bengaluru, Karnataka",
                specialties: ["Mental Health", "Neurology", "Psychiatry"],
                website: "https://nimhans.ac.in",
                beds: "950",
                established: 1925,
                image: "/assets/NIMHANS - National Institute of Mental Health and Neurosciences.webp",
                tags: "government mental neurology psychiatry"
            },
            {
                id: 5,
                name: "Sri Jayadeva Institute of Cardiovascular Sciences and Research",
                location: "Bengaluru, Karnataka",
                specialties: ["Cardiology", "Heart Surgery"],
                website: "http://www.jayadevacardiology.com",
                beds: "1200",
                established: 2001,
                image: "/assets/Sri Jayadeva Institute of Cardiovascular Sciences and Research.webp",
                tags: "government cardiology"
            },
            {
                id: 6,
                name: "King Edward Memorial Hospital (KEM)",
                location: "Mumbai, Maharashtra",
                specialties: ["Orthopedics", "Oncology", "Cardiology"],
                website: "https://kem.edu",
                beds: "1800",
                established: 1926,
                image: "/assets/King Edward Memorial Hospital (KEM).webp",
                tags: "government multi"
            },
            {
                id: 7,
                name: "Lokmanya Tilak Municipal Medical College and General Hospital (Sion Hospital)",
                location: "Mumbai, Maharashtra",
                specialties: ["Pediatrics", "Surgery", "Gynecology"],
                website: "https://ltmmc.edu.in",
                beds: "1400",
                established: 1964,
                image: "/assets/Lokmanya Tilak Municipal Medical College and General Hospital (Sion Hospital).webp",
                tags: "government general pediatrics"
            },
            {
                id: 8,
                name: "Rajiv Gandhi Government General Hospital",
                location: "Chennai, Tamil Nadu",
                specialties: ["General Medicine", "Neurology", "Cardiology"],
                website: "https://www.tnhealth.tn.gov.in",
                beds: "3000",
                established: 1664,
                image: "/assets/Rajiv Gandhi Government General Hospital.jpg",
                tags: "government general neurology"
            },
            {
                id: 9,
                name: "Calcutta Medical College and Hospital",
                location: "Kolkata, West Bengal",
                specialties: ["Surgery", "Cardiology", "Gynecology"],
                website: "https://www.medicalcollegekolkata.in",
                beds: "2000",
                established: 1835,
                image: "/assets/Calcutta Medical College and Hospital.webp",
                tags: "government general surgery"
            },
            {
                id: 10,
                name: "Institute of Liver and Biliary Sciences (ILBS)",
                location: "New Delhi",
                specialties: ["Liver Transplant", "Gastroenterology", "Hepatology"],
                website: "https://www.ilbs.in",
                beds: "500",
                established: 2009,
                image: "/assets/Institute of Liver and Biliary Sciences (ILBS).jpg",
                tags: "government liver gastro"
            },
            {
                id: 11,
                name: "RML Hospital-Dr. Ram Manohar Lohia Hospital",
                location: "New Delhi",
                specialties: ["General Medicine", "Cardiology", "Dermatology"],
                website: "https://rmlh.nic.in",
                beds: "1500",
                established: 1932,
                image: "/assets/RML.jpg",
                tags: "government general cardiology"
            },
            {
                id: 12,
                name: "Safdarjung Hospital",
                location: "New Delhi",
                specialties: ["Orthopedics", "General Surgery", "Neurosciences"],
                website: "https://www.vmmc-sjh.nic.in",
                beds: "1531",
                established: 1942,
                image: "/assets/Safdarjung Hospital.webp",
                tags: "government orthopedics surgery"
            },
            {
                id: 13,
                name: "Government Medical College & Hospital (GMCH)",
                location: "Nagpur, Maharashtra",
                specialties: ["Cardiology", "Emergency Medicine", "Orthopedics"],
                website: "https://gmch.gov.in",
                beds: "1700",
                established: 1947,
                image: "/assets/Government Medical College and Hospital (GMCH).jpg",
                tags: "government emergency orthopedics"
            },
            {
                id: 14,
                name: "Indira Gandhi Institute of Medical Sciences (IGIMS)",
                location: "Patna, Bihar",
                specialties: ["Oncology", "Urology", "Nephrology"],
                website: "https://www.igims.org",
                beds: "1200",
                established: 1983,
                image: "/assets/Indira Gandhi Institute of Medical Sciences (IGIMS).jpg",
                tags: "government oncology nephrology"
            },
            {
                id: 15,
                name: "SCB Medical College and Hospital",
                location: "Cuttack, Odisha",
                specialties: ["Surgery", "ENT", "Orthopedics"],
                website: "https://scbmch.nic.in",
                beds: "1800",
                established: 1944,
                image: "/assets/SCB Medical College and Hospital.jpg",
                tags: "government surgery ENT"
            },
            {
                id: 16,
                name: "Government Stanley Medical College Hospital",
                location: "Chennai, Tamil Nadu",
                specialties: ["Transplants", "General Medicine", "Plastic Surgery"],
                website: "https://stanmed.org",
                beds: "1800",
                established: 1938,
                image: "/assets/Government Stanley Medical College Hospital.jpg",
                tags: "government transplants plastic"
            },
            {
                id: 17,
                name: "Government Medical College and Hospital (GMCH)",
                location: "Chandigarh",
                specialties: ["Cardiology", "Gynecology", "Urology"],
                website: "https://gmch.gov.in",
                beds: "900",
                established: 1991,
                image: "/assets/Government Medical College and Hospital (GMCH).jpg",
                tags: "government urology gynecology"
            },
            {
                id: 18,
                name: "Victoria Hospital",
                location: "Bengaluru, Karnataka",
                specialties: ["Trauma Care", "General Surgery", "Dermatology"],
                website: "https://kmc.karnataka.gov.in",
                beds: "1000",
                established: 1900,
                image: "/assets/Victoria Hospital.jpg",
                tags: "government trauma surgery"
            },
            {
                id: 19,
                name: "Osmania General Hospital",
                location: "Hyderabad, Telangana",
                specialties: ["Surgery", "Cardiology", "Gynecology"],
                website: "https://osmaniamedicalcollege.org",
                beds: "1200",
                established: 1846,
                image: "/assets/Osmania General Hospital.jpg",
                tags: "government gynecology surgery"
            },
            {
                id: 20,
                name: "Government Medical College Srinagar",
                location: "Srinagar, Jammu & Kashmir",
                specialties: ["General Medicine", "Psychiatry", "ENT"],
                website: "https://www.gmcs.edu.in",
                beds: "1500",
                established: 1959,
                image: "/assets/Government Medical College Srinagar.jpg",
                tags: "government psychiatry ENT"
            }
        ];

        // DOM elements
        const searchInput = document.getElementById('hospitalSearch');
        const tabContents = {
            'all': document.getElementById('all'),
            'cardio': document.getElementById('cardio'),
            'neuro': document.getElementById('neuro'),
            'ortho': document.getElementById('ortho'),
            'pedia': document.getElementById('pedia')
        };

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Render all hospitals initially
            renderHospitals(hospitals, tabContents['all']);
            populateSpecialtyTabs();
            
            // Search functionality
            searchInput.addEventListener('keyup', function() {
                const searchTerm = this.value.toLowerCase();
                filterHospitals(searchTerm);
            });
        });

        // Populate specialty tabs
        function populateSpecialtyTabs() {
            const specialtyMap = {
                'cardio': 'cardiology',
                'neuro': 'neurology',
                'ortho': 'orthopedics',
                'pedia': 'pediatrics'
            };

            for (const [tabId, specialty] of Object.entries(specialtyMap)) {
                const filteredHospitals = hospitals.filter(hospital => 
                    hospital.tags.includes(specialty)
                );
                
                renderHospitals(filteredHospitals, tabContents[tabId]);
            }
        }

        // Filter hospitals based on search term
        function filterHospitals(searchTerm) {
            const activeTab = document.querySelector('.tab-content.active').id;
            let filteredHospitals = [];
            
            if (activeTab === 'all') {
                filteredHospitals = hospitals.filter(hospital => 
                    hospital.name.toLowerCase().includes(searchTerm) ||
                    hospital.location.toLowerCase().includes(searchTerm) ||
                    hospital.tags.includes(searchTerm) ||
                    hospital.specialties.some(spec => 
                        spec.toLowerCase().includes(searchTerm))
                );
            } else {
                const specialtyMap = {
                    'cardio': 'cardiology',
                    'neuro': 'neurology',
                    'ortho': 'orthopedics',
                    'pedia': 'pediatrics'
                };
                
                filteredHospitals = hospitals.filter(hospital => 
                    hospital.tags.includes(specialtyMap[activeTab]) && (
                        hospital.name.toLowerCase().includes(searchTerm) ||
                        hospital.location.toLowerCase().includes(searchTerm) ||
                        hospital.tags.includes(searchTerm) ||
                        hospital.specialties.some(spec => 
                            spec.toLowerCase().includes(searchTerm))
                    )
                );
            }
            
            renderHospitals(filteredHospitals, tabContents[activeTab]);
        }

        // Render hospitals to a tab
        function renderHospitals(hospitalsToRender, tabElement) {
            if (hospitalsToRender.length === 0) {
                tabElement.innerHTML = '<div class="no-results">No hospitals found matching your search</div>';
                return;
            }
            
            tabElement.innerHTML = hospitalsToRender.map(hospital => `
                <div class="hospital-card" data-specialties="${hospital.tags}">
                    <div class="hospital-image-container">
                        <img src="${hospital.image}" alt="${hospital.name}" class="hospital-image">
                    </div>
                    <div class="hospital-info">
                        <h3>${hospital.name}</h3>
                        <p><strong>Location:</strong> ${hospital.location}</p>
                        <div class="specialties">
                            ${hospital.specialties.map(spec => 
                                `<span class="specialty-tag">${spec}</span>`
                            ).join('')}
                        </div>
                        <p><strong>Beds:</strong> ${hospital.beds}</p>
                        <p><strong>Established:</strong> ${hospital.established}</p>
                        <p><strong>Website:</strong> <a href="${hospital.website}" class="website-link" target="_blank">${new URL(hospital.website).hostname}</a></p>
                    </div>
                </div>
            `).join('');
        }

        // Tab switching
        function openTab(tabId) {
            // Hide all tab contents
            Object.values(tabContents).forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Deactivate all tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Activate the selected tab
            tabContents[tabId].classList.add('active');
            event.currentTarget.classList.add('active');
            
            // Clear search when switching tabs
            searchInput.value = '';
            
            // Show all hospitals in the selected tab
            if (tabId === 'all') {
                renderHospitals(hospitals, tabContents.all);
            }
        }




        const placeholders = [
            "Search hospitals by name, location ...",
            "Search by city...",
            "Search by specialty...",
            "Search by name...",
            "Search by location...",
            "Search by beds...",
            "Search by established year..."
          ];
          
          let currentIndex = 0;
          const input = document.getElementById("hospitalSearch");
          
          setInterval(() => {
            input.setAttribute("placeholder", placeholders[currentIndex]);
            currentIndex = (currentIndex + 1) % placeholders.length;
          }, 2000);
          