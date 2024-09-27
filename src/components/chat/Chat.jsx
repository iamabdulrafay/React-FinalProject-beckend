import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./Chat.css";
import Modal from "react-bootstrap/Modal";
import { useTheme } from "../../Teheme";

const ChatComponent = ({ show, handleClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const csrfToken = localStorage.getItem("access_CSRFToken");
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.get(
        "https://web-production-ddef.up.railway.app/api/user-messages/",
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
        }
      );

      setMessages(response.data);
      setError(null);
    } catch (error) {
      console.error(
        "Failed to fetch messages:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.detail || "Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  }, []); // useCallback ensures this function does not change on every render

  const addMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newMessage.trim()) return;

      setLoading(true);
      try {
        const csrfToken = localStorage.getItem("access_CSRFToken");
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found.");
        }

        await axios.post(
          "https://web-production-ddef.up.railway.app/api/user-messages/",
          { message: newMessage },
          {
            headers: {
              Authorization: `Token ${token}`,
              "X-CSRFToken": csrfToken,
              "Content-Type": "application/json",
            },
          }
        );

        setNewMessage("");
        fetchMessages(); // Fetch messages after sending a new message
        setError(null);
      } catch (error) {
        console.error(
          "Failed to add message:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.detail || "Failed to send message.");
      } finally {
        setLoading(false);
      }
    },
    [newMessage, fetchMessages]
  ); // Add dependencies to prevent infinite loop

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]); // fetchMessages dependency ensures it runs only when fetchMessages changes

  return (
    <Modal
      style={{ background: "#164a3e" }}
      show={show}
      onHide={handleClose}
      fullscreen={true}>
      <Modal.Header closeButton className={`Modal ${theme}`}>
        <Modal.Title>Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`Modal ${theme}`}>
        <div className={`chat-container ${theme}`}>
          <div className="message-container">
            {loading && <p>Loading messages...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {messages.map((message) => (
              <div key={message.id}>
                <div className="message sender-message">
                  <img
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt="Sender Avatar"
                    className="avatar"
                  />
                  {message.message}
                </div>
                {message.replies.length > 0 &&
                  message.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className={`message receiver-message ${theme}`}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                        alt="Receiver Avatar"
                        className="avatar"
                      />
                      {reply.message}
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <form onSubmit={addMessage} className="message">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChatComponent;
