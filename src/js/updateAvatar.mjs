
const apiBase = "https://v2.api.noroff.dev";
const apiProfile = "/auction/profiles/";


async function updateAvatar() {
    document.getElementById("updateAvatarBtn").addEventListener("click", async function (evt) {
        evt.preventDefault(); // Prevent default button action
        const newAvatarUrl = document.getElementById("newAvatarUrl").value;
        if (!newAvatarUrl) {
            alert("Please enter a URL for the new avatar.");
            return;
        }

        const userData = {
            avatar: {
                url: newAvatarUrl,
                alt: "user avatar", 
            },
        };

        const name = localStorage.getItem("userName");
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`${apiBase}${apiProfile}${name}`, {
                method: "PUT",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw { data: errorData, status: response.status };
            }

            const data = await response.json();
            const profileData = localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null;
            if (profileData) {
                profileData.data.avatar.url = userData.avatar.url;
                localStorage.setItem("profile", JSON.stringify(profileData));
            }
            alert("Avatar updated successfully");
            window.location.reload(); // Reload the page to reflect the avatar change
        } catch (error) {
            if (error.status === 400 && error.data && error.data.errors) {
                const errorMessage = error.data.errors.map((err) => err.message).join("\n");
                alert(`Error updating avatar:\n${errorMessage}`);
            } else {
                console.error("Error updating avatar:", error);
                alert(`Error updating avatar: ${error}.`);
            }
        }
    });
}

// Call updateAvatar function after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", updateAvatar);
