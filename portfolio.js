const portfolioProjects = {
    kine: {
        title: "Kine: Neural-Field Imaging at Scale",
        organization: "Bouman Lab, Caltech · Team of 4",
        summary: "I led positional-encoding tuning and validated GPU NUFFT imaging as our team scaled Kine to HL Tau’s 33.48 million measurements.",
        sections: [
            ["Motivation", "Radio telescopes measure Fourier components of the sky rather than taking direct pictures, so astronomers reconstruct images from sparse visibility measurements. Kine, a neural-field imaging method published in Nature in 2026, worked on the Event Horizon Telescope’s eight antennas, but scaling its dense Fourier-transform implementation to larger arrays such as ALMA was limited by memory. I joined a four-person team with the Bouman Lab to investigate the imaging pipeline and scale it to protoplanetary-disk data."],
            ["My Contributions", "I implemented the XX/YY-to-Stokes-I conversion, including noise propagation: I = (XX + YY)/2 and σI = ½√(1/wXX + 1/wYY), where each weight is inverse variance. I derived the imaging grid from the data: about 94 mas angular resolution, 18.75 mas pixels, and a 2.4″ field at 128×128. On DL Tau, I led the positional-encoding search, comparing encoding levels 0, 1, and 2 and training lengths of 3,000 versus 6,000 steps. Level 1 improved χ² from 3.38 to 3.34, produced crisper rings, and recovered 0.16 Jy against 0.153 Jy expected. I also explored depth-versus-encoding tradeoffs with the DFT at 128 pixels, width 256, 3,000 training steps, and a 3,000-step warm start. I validated GPU imaging with the team’s integrated NUFFT operator."],
            ["Key Challenge", "The memory bottleneck came from the forward model: the DFT formed a dense matrix with one row per visibility and one column per image pixel. For a 512×512 grid, the equivalent matrix was estimated at 8.04 TB for the 3.84-million-row Band 3 workload and 70.21 TB for all 33.48 million rows. A separate 64×64 estimate for the larger target dataset was 1.58 TB. These sizes far exceed a GPU’s 40–80 GB of memory. On DL Tau, I also found that χ² was already below the estimated noise level of about 3.55, so additional tuning risked fitting noise rather than signal."],
            ["Scaling Results", "The team integrated a GPU non-uniform FFT into Kine while keeping the A-matrix path as the backwards-compatible default; the operator computes the mapping in O(P log P + M) time and O(P + M) memory. That made it possible to move from DL Tau to HL Tau, roughly 5,000× larger. In an exploratory single-image Band 3 scaling run (3.84 million rows, 2″ field, depth 6, width 128, positional encoding (1,1)), I measured 37.8 iterations per second—about 26 seconds per 1,000 iterations—with 3.0 GB peak GPU memory; this setup was a scaling test, not a final benchmark. In a separate 512×512 Band 3 run, the T4 reached 7.48 iterations per second at 5.2 GiB and the A100 reached 38.22 iterations per second at 5.5 GiB. I also imaged all 13 frequency images from the full 33-million-row HL Tau data on a T4: 64×64 took 2.15 iterations per second at 4.2 GB, while 256×256 took 0.84 iterations per second at 13.3 GB. The final Band 6 reconstruction used 13.4 million visibilities to make a 512×512 image over 4″ in 13.5 minutes on one V100; fitting Bands 3, 4, and 6 together used 33.5 million visibilities and took 30 minutes on one V100."],
            ["Further Optimization", "I evaluated selective checkpointing, which recomputes activations during backpropagation instead of storing them. Across the tested A100 workloads it reduced peak memory by 32–43% while changing training rate by less than 1%. Batching increased step rate from 42.5 to 62.5 iterations per second in one test, but made total data throughput about 10× slower and did not free useful GPU capacity. The team also extended the NUFFT path to multi-frequency and multi-epoch data."]
        ],
        link: "https://github.com/KahaanGandhi/kine",
        linkLabel: "View the Kine repository",
        mediaNote: "Figures from the project presentation. Confirm with the team and Bouman Lab that these results are cleared for public sharing.",
        media: [
            ["Comparison", "96×96 A-matrix and NUFFT imaging", "Top-hat reconstruction sequence from the A-matrix/NUFFT imaging experiment.", "media/kine/96px-dft-vs-nufft.png"],
            ["Image", "DL Tau reference", "Reference reconstruction of the DL Tau protoplanetary disk.", "media/kine/dl-tau-reference.png"],
            ["Comparison", "Depth vs. positional encoding (DFT)", "Hyperparameter sweep at 128×128 pixels, width 256, with 3,000 training and 3,000 warm-start iterations.", "media/kine/depth-positional-encoding-dft.png"],
            ["Plot", "DFT fit and loss curves", "Top-hat target, warm-start and trained neural-field images, with image-loss and visibility-χ² curves.", "media/kine/dft-training-fit-and-loss.png"],
            ["Comparison", "Baseline vs. Kine", "Side-by-side comparison of baseline and Kine reconstructions.", "media/kine/baseline-vs-kine.png"],
            ["Benchmark", "A100 training rate", "Steady iterations per second across Band 3 visibility counts and image resolutions. The 3.84-million-row scaling run reached 37.8 iterations per second.", "media/kine/a100-training-rate.png"],
            ["Benchmark", "A100 peak GPU memory", "Peak memory across Band 3 visibility counts and image resolutions; includes 3.0 GB for the exploratory 3.84-million-row scaling setup.", "media/kine/a100-peak-memory.png"],
            ["Benchmark", "Selective checkpointing", "Across tested workloads, checkpointing reduced peak memory by 32–43% with less than 1% change in training rate.", "media/kine/selective-checkpointing.png"],
            ["Image", "HL Tau · Band 6", "512×512 reconstruction over a 4″ field using 13.4 million visibilities; completed in 13.5 minutes on one V100.", "media/kine/hl-tau-band-6.png"]
        ]
    },
    neuer: {
        title: "Neuer: Vision-Based Humanoid Goalkeeper",
        organization: "AMBER Lab, Caltech",
        summary: "In progress: I am developing a vision-based goalkeeper that will let a Unitree G1 see shots through its own head camera, without motion capture.",
        sections: [
            ["Motivation", "Humanoids can learn athletic skills from a single video, but the TaskNPoint tennis-backhand setup in my lab relies on ceiling-mounted OptiTrack cameras to tell the robot where the ball is. Even with external tracking, it hit 100% of slow balls but only 45% of fast ones, with misses traced to perception. I want to develop a goalkeeper that sees for itself and can eventually operate beyond a motion-capture lab."],
            ["Choosing an Approach", "I sketched two possible approaches: an end-to-end system that maps camera images directly to actions, and an architecture-based system that breaks the task into separate computer-vision challenges. I chose the architecture-based approach so I can develop a deep, ground-up understanding of computer vision for humanoid robotics. The whiteboard photo shows this early brainstorming and how I decomposed each approach."],
            ["Planned Design", "I will build the perception pipeline around the G1's head camera. I will calibrate the camera with OpenCV to map pixels into the robot frame, then develop and compare a color-threshold baseline with a learned detector intended to run onboard an NVIDIA Jetson. I will use RGB-D depth to estimate the ball's 3D position, compensate for head motion, and use a Kalman filter to predict when and where the ball will cross the goal line. I will then use those predictions as targets for an RL save policy trained in MuJoCo (MJlab), with simulated camera noise, latency, and dropped frames. In parallel, I will design a custom G1 head in SolidWorks with an integrated depth camera and check its stiffness with FEA."],
            ["Challenges to Test", "I will test the full perception-to-action timing budget, not just detector accuracy: an estimate that arrives early may be more useful than a more accurate estimate that arrives too late. I will also test how well head-motion compensation separates the robot's movement from the ball's trajectory."],
            ["Validation and Next Steps", "This project is in progress; the results below are planned, not completed. I will compare camera-based ball tracking with OptiTrack running in parallel as independent ground truth, without giving OptiTrack data to the policy. After validating tracking, I will test the save policy, then work toward catching the ball and throwing it back."]
        ],
        link: "https://github.com/felixogon/neuer",
        linkLabel: "View the Neuer repository",
        mediaNote: "Early whiteboard brainstorming: comparing end-to-end control with an architecture-based approach and breaking each down into computer-vision challenges.",
        media: [
            ["Photo", "Approach brainstorming", "I sketched two approaches—end-to-end control and an architecture-based pipeline—and broke each into its computer-vision challenges.", "media/neuer/approach-brainstorm.png"]
        ]
    },
    orca: {
        title: "ORCA Dexterous Robotic Hands",
        organization: "ORCA Dexterity",
        summary: "Assembled, calibrated, and tested 10 tactile 17-DoF tendon-driven hands, shipped to customers at under one-seventh the cost of commercial hands.",
        sections: [
            ["Motivation", "Research-grade dexterous hands can cost tens of thousands of dollars, limiting how many labs can collect hand data for imitation learning. ORCA is an open-source hand from ETH Zurich's Soft Robotics Lab that brings the cost down."],
            ["Design Approach", "ORCA v1 was designed by Clemens Christoph and his team at ORCA Dexterity. As a freelance robotics engineer, I assembled the open design into working hardware. Each hand has 17 degrees of freedom, with tendons routed from wrist-mounted motors to the fingers and tactile sensors in the fingertips. I assembled each hand in under 8 hours, including motor mounting, tendon routing, and sensor wiring, then calibrated joint ranges and tendon tension so the hands behaved consistently."],
            ["Key Challenge", "Building one hand is craft; building many consistent hands is process. Small tendon-tension differences can change how a finger closes, while long data-collection runs make reliability essential. I calibrated each finger's joint range and tendon tension so the assembled hands behaved consistently."],
            ["Result", "I built and assembled 10 hands, unit-tested each for joint range, tendon tension, and tactile response, and verified runs of more than 7 hours uninterrupted. I shipped them to customers including Meta, Google, and Toyota Research Institute at under one-seventh the cost of commercial hands."],
            ["What I Learned", "I stepped into the shoes of a user assembling and using the product, then fed practical usability issues back to Clemens Christoph and his team at ORCA Dexterity. That included small but consequential improvements, such as adjusting hole dimensions and tolerances where tendons were difficult or impossible to thread. This taught me that reliability and usability are shaped by details in the design, not just by the final performance."]
        ],
        mediaNote: "A photo of me assembling ORCA v1 and a video showing its external flexor tendon routing.",
        media: [
            ["Photo", "Assembling ORCA v1", "A view of my ORCA v1 hand during assembly.", "media/orca-v1-assembly.jpg"],
            ["Video", "Tendon routing", "I demonstrate the flexor routed externally along the palm-facing (inner) side of the finger and show the complexity of the tendon paths.", "media/orca-flexor-tendon-demo.mp4"]
        ]
    },
    "delivery-robot": {
        title: "Autonomous Delivery Robot",
        organization: "ETH Zurich, Product Development Group",
        summary: "Designed and built an Arduino delivery robot under 1.5 kg that folds into a 210 mm cube and delivers 40 spheres to 8 targets in 4 minutes.",
        sections: [
            ["Motivation", "ETH Zurich's Product Development Group set a compact product-development challenge: build a robot weighing at most 1.5 kg, folding into a 210 mm cube, and delivering 40 spheres to 8 targets in 4 minutes. I designed and built the robot to meet these constraints."],
            ["Design Approach", "I created CAD files for the robot and its mechanisms, designed a vibration-motor ball-filtering system, and designed the 3D-printed nutshell mechanism that a servo rotates 180° to transfer balls one at a time onto the measuring tape. The tape transports each ball to its target. I soldered and integrated the electronics around an Arduino UNO R3 and Adafruit Motor Shield V2, with DC motors, servos, IR sensors, limit switches, and a 12V LiFePO4 battery. The mechanical build used 3D-printed PLA, acrylic, MDF, and cardboard. I developed and tested the robot over five two-week sprints, each ending in a mandatory test run."],
            ["Key Challenge", "I had to make the ball-filtering and transfer mechanisms work reliably while meeting strict size and weight limits. I tested whether the end-effector reached its target position, then tested the vibration motor and servo mechanism to verify that balls were collected, transferred individually onto the measuring tape, and transported to the target."],
            ["Result", "I built a robot under 1.5 kg that folded into a 210 mm cube and delivered 40 spheres to 8 targets in 4 minutes. My work included the mechanism CAD, the vibration-motor ball filter, the 3D-printed transfer mechanism, and soldering the electronic components."],
            ["What I Learned", "I learned to use hard constraints to guide design decisions, and to prioritize issues exposed by each two-week test run."]
        ],
        mediaNote: "Course route, wheel CAD, ball-catching platform, and two test videos.",
        media: [
            ["Image", "Course route and dimensions", "Route sketch showing the robot's course, targets, and platform dimensions.", "media/delivery-robot/course-route-dimensions.png"],
            ["Image", "Robot wheel CAD", "CAD drawing of the robot wheel.", "media/delivery-robot/wheel-cad.png"],
            ["Photo", "Ball-catching frame platform", "The 3D-printed main platform of the robot's ball-catching frame.", "media/delivery-robot/printed-component.jpg"],
            ["Video", "End-effector target-position test", "Testing whether the end-effector can reach the target position.", "media/delivery-robot/target-position-test.mp4"],
            ["Video", "Ball collection and delivery test", "My vibration-motor ball filter and servo-driven, 3D-printed transfer mechanism move balls individually onto the measuring tape for delivery to the target.", "media/delivery-robot/ball-collection-test-run.mp4"]
        ]
    }
};

const projectRoot = document.getElementById("project-detail");
const project = portfolioProjects[new URLSearchParams(window.location.search).get("id")];
const mediaViewer = document.querySelector(".media-viewer");
const mediaViewerStage = mediaViewer.querySelector(".media-viewer-stage");
const mediaViewerCaption = mediaViewer.querySelector(".media-viewer-caption");
const zoomControls = mediaViewer.querySelector(".image-zoom-controls");
let zoomLevel = 1;
let originalImageSize;

function updateImageZoom() {
    const image = mediaViewerStage.querySelector("img");
    if (!image || !originalImageSize) return;

    image.style.width = `${originalImageSize.width * zoomLevel}px`;
    image.style.height = `${originalImageSize.height * zoomLevel}px`;
}

function openImageViewer(image, caption) {
    const expandedImage = document.createElement("img");
    expandedImage.src = image.currentSrc || image.src;
    expandedImage.alt = image.alt;
    mediaViewerStage.replaceChildren(expandedImage);
    mediaViewerCaption.textContent = caption;
    zoomControls.hidden = false;

    const showImage = () => {
        const fit = Math.min(
            1,
            (window.innerWidth * 0.88) / expandedImage.naturalWidth,
            (window.innerHeight * 0.76) / expandedImage.naturalHeight
        );
        originalImageSize = {
            width: expandedImage.naturalWidth * fit,
            height: expandedImage.naturalHeight * fit
        };
        zoomLevel = 1;
        updateImageZoom();
    };

    if (expandedImage.complete) showImage();
    else expandedImage.addEventListener("load", showImage, { once: true });

    mediaViewer.showModal();
}

mediaViewer.querySelector(".media-viewer-close").addEventListener("click", () => mediaViewer.close());
mediaViewer.addEventListener("click", event => {
    if (event.target === mediaViewer) mediaViewer.close();
});
mediaViewer.addEventListener("close", () => {
    mediaViewerStage.replaceChildren();
    originalImageSize = undefined;
    zoomLevel = 1;
});
zoomControls.addEventListener("click", event => {
    const button = event.target.closest("button[data-zoom]");
    if (!button) return;

    if (button.dataset.zoom === "in") zoomLevel = Math.min(zoomLevel * 1.5, 8);
    if (button.dataset.zoom === "out") zoomLevel = Math.max(zoomLevel / 1.5, 0.25);
    if (button.dataset.zoom === "reset") zoomLevel = 1;
    updateImageZoom();
});

function appendTextElement(parent, tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    parent.append(element);
    return element;
}

if (!project) {
    projectRoot.replaceChildren();
    appendTextElement(projectRoot, "h1", "page-title", "Project not found");
    appendTextElement(projectRoot, "p", "", "Choose a project from the portfolio to view its details.");
    const link = document.createElement("a");
    link.href = "portfolio.html";
    link.textContent = "Return to all projects";
    projectRoot.append(link);
} else {
    document.title = `${project.title} | Felix Ogon`;
    projectRoot.replaceChildren();

    const header = document.createElement("header");
    header.className = "project-header";
    appendTextElement(header, "p", "project-meta", project.organization);
    appendTextElement(header, "h1", "page-title", project.title);
    appendTextElement(header, "p", "project-summary", project.summary);
    if (project.link) {
        const link = document.createElement("a");
        link.className = "project-repo-link";
        link.href = project.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = project.linkLabel;
        header.append(link);
    }
    projectRoot.append(header);

    const mediaSection = document.createElement("section");
    mediaSection.className = "project-section";
    appendTextElement(mediaSection, "h2", "section-title", "Project media");
    appendTextElement(mediaSection, "p", "section-intro", project.mediaNote || "Media placeholders are ready for the project photos, videos, plots, and design files.");

    const mediaGrid = document.createElement("div");
    mediaGrid.className = "media-grid";
    for (const [type, title, caption, src] of project.media) {
        const figure = document.createElement("figure");
        figure.className = "media-placeholder";
        if (src && type === "Video") {
            const video = document.createElement("video");
            video.className = "media-asset";
            video.controls = true;
            video.playsInline = true;
            video.preload = "metadata";
            const source = document.createElement("source");
            source.src = src;
            source.type = "video/mp4";
            video.append(source);
            video.append(document.createTextNode("Your browser does not support embedded video."));
            figure.append(video);
        } else if (src && type !== "Video") {
            const image = document.createElement("img");
            image.className = "media-asset";
            image.src = src;
            image.alt = caption;
            image.loading = "lazy";
            image.tabIndex = 0;
            image.setAttribute("role", "button");
            image.setAttribute("aria-label", `Expand image: ${title}`);
            figure.append(image);
        } else {
            const visual = document.createElement("div");
            visual.className = "media-placeholder-visual";
            visual.setAttribute("aria-hidden", "true");
            appendTextElement(visual, "span", "media-type", type);
            appendTextElement(visual, "span", "media-prompt", "Media coming soon");
            figure.append(visual);
        }
        const figcaption = document.createElement("figcaption");
        appendTextElement(figcaption, "strong", "", title);
        appendTextElement(figcaption, "span", "", caption);
        figure.append(figcaption);
        mediaGrid.append(figure);
    }
    mediaGrid.addEventListener("click", event => {
        const image = event.target.closest("img.media-asset");
        if (image) openImageViewer(image, image.alt);
    });
    mediaGrid.addEventListener("keydown", event => {
        const image = event.target.closest("img.media-asset");
        if (image && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            openImageViewer(image, image.alt);
        }
    });
    mediaSection.append(mediaGrid);
    projectRoot.append(mediaSection);

    const storySection = document.createElement("section");
    storySection.className = "project-section project-story";
    for (const [heading, text] of project.sections) {
        appendTextElement(storySection, "h2", "section-title", heading);
        appendTextElement(storySection, "p", "", text);
    }
    projectRoot.append(storySection);

    const backLink = document.createElement("a");
    backLink.className = "project-back-link";
    backLink.href = "portfolio.html";
    backLink.textContent = "← Back to all projects";
    projectRoot.append(backLink);
}
