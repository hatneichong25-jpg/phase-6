
const form = document.getElementById("feedbackForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const feedback = {
        name: document.getElementById("name").value,
        rating: Number(document.getElementById("rating").value),
        comment: document.getElementById("comment").value
    };

    try {
        const response = await fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedback)
        });

        const result = await response.json();

        alert(result.message);

        if (response.ok) {
            form.reset();
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong!");
    }
});
