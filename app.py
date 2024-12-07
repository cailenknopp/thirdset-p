from flask import Flask, request, jsonify, render_template
import numpy as np
import tennisim as ts

app = Flask(__name__)

def markov_chain_model(p1_first_serve, p1_second_serve, p1_break_point, p2_first_serve, p2_second_serve, p2_break_point, p1_points, p1_games, p1_sets, p2_points, p2_games, p2_sets, server, num_iterations=1000):
    # Convert tennis points to numerical values
    points_map = {'0': 0, '15': 1, '30': 2, '40': 3}
    p1_points = points_map.get(p1_points, 0)
    p2_points = points_map.get(p2_points, 0)
    
    # Define the transition matrix based on the server
    if server == 'Player 1':
        transition_matrix = np.array([
            [p1_first_serve * p1_break_point, 1 - p1_first_serve * p1_break_point],
            [1 - p2_first_serve * p2_break_point, p2_first_serve * p2_break_point]
        ])
    else:
        transition_matrix = np.array([
            [p2_first_serve * p2_break_point, 1 - p2_first_serve * p2_break_point],
            [1 - p1_first_serve * p1_break_point, p1_first_serve * p1_break_point]
        ])
    
    initial_state = np.array([0.5, 0.5])
    state = initial_state
    for _ in range(num_iterations):
        state = np.dot(state, transition_matrix)
    return state

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    p1_first_serve = float(data['live_p1_first_serve'])
    p1_second_serve = float(data['live_p1_second_serve'])
    p1_break_point = float(data['live_p1_break_point'])
    p2_first_serve = float(data['live_p2_first_serve'])
    p2_second_serve = float(data['live_p2_second_serve'])
    p2_break_point = float(data['live_p2_break_point'])
    p1_points = data['live_p1_points']
    p1_games = int(data['live_p1_games'])
    p1_sets = int(data['live_p1_sets'])
    p2_points = data['live_p2_points']
    p2_games = int(data['live_p2_games'])
    p2_sets = int(data['live_p2_sets'])
    server = data['live_server']
    num_simulations = 1500
    mean_probabilities = markov_chain_model(p1_first_serve, p1_second_serve, p1_break_point, p2_first_serve, p2_second_serve, p2_break_point, p1_points, p1_games, p1_sets, p2_points, p2_games, p2_sets, server, num_simulations)
    return jsonify({
        'p1_win_probability': mean_probabilities[0] * 100,
        'p2_win_probability': mean_probabilities[1] * 100
    })

if __name__ == '__main__':
    app.run(debug=True)