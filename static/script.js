document.getElementById('markov-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        p1_first_serve: parseFloat(formData.get('p1_first_serve')),
        p1_second_serve: parseFloat(formData.get('p1_second_serve')),
        p1_break_point: parseFloat(formData.get('p1_break_point')),
        p2_first_serve: parseFloat(formData.get('p2_first_serve')),
        p2_second_serve: parseFloat(formData.get('p2_second_serve')),
        p2_break_point: parseFloat(formData.get('p2_break_point'))
    };
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('results').innerHTML = `
            <p>Probability of Player 1 winning: ${(result.p1_win_probability * 100).toFixed(2)}%</p>
            <p>Probability of Player 2 winning: ${(result.p2_win_probability * 100).toFixed(2)}%</p>
        `;
    });
});

document.getElementById('live-markov-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        p1_first_serve: parseFloat(formData.get('live_p1_first_serve')),
        p1_second_serve: parseFloat(formData.get('live_p1_second_serve')),
        p1_break_point: parseFloat(formData.get('live_p1_break_point')),
        p2_first_serve: parseFloat(formData.get('live_p2_first_serve')),
        p2_second_serve: parseFloat(formData.get('live_p2_second_serve')),
        p2_break_point: parseFloat(formData.get('live_p2_break_point'))
    };
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('live-results').innerHTML = `
            <p>Probability of Player 1 winning: ${(result.p1_win_probability * 100).toFixed(2)}%</p>
            <p>Probability of Player 2 winning: ${(result.p2_win_probability * 100).toFixed(2)}%</p>
        `;
    });
});

document.getElementById('match_type').addEventListener('change', function(event) {
    const matchType = event.target.value;
    fetch(`/default_probabilities?match_type=${matchType}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('p1_first_serve').value = data.p1_first_serve;
            document.getElementById('p1_second_serve').value = data.p1_second_serve;
            document.getElementById('p1_break_point').value = data.p1_break_point;
            document.getElementById('p2_first_serve').value = data.p2_first_serve;
            document.getElementById('p2_second_serve').value = data.p2_second_serve;
            document.getElementById('p2_break_point').value = data.p2_break_point;
        });
});

document.getElementById('live_match_type').addEventListener('change', function(event) {
    const matchType = event.target.value;
    fetch(`/default_probabilities?match_type=${matchType}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('live_p1_first_serve').value = data.p1_first_serve;
            document.getElementById('live_p1_second_serve').value = data.p1_second_serve;
            document.getElementById('live_p1_break_point').value = data.p1_break_point;
            document.getElementById('live_p2_first_serve').value = data.p2_first_serve;
            document.getElementById('live_p2_second_serve').value = data.p2_second_serve;
            document.getElementById('live_p2_break_point').value = data.p2_break_point;
        });
});