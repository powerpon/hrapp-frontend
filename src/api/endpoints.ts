import axios from "axios";

export default {
    getAllSkills: async (page: number) => {
        return await axios.get("http://localhost:8080/skill/all", {params: {page: page}});
    },
    getFilteredCandidatesBySkills: async (skillIds: number[], page: number) => {
        return await axios.get("http://localhost:8080/candidate/skills", {params: {skillIds: skillIds.join(','), page: page}});
    },
    getCandidatesByName: async (name: string, page: number) => {
        return await axios.get("http://localhost:8080/candidate/search/name", {params: {name: name, page: page}});
    },
    createNewCandidate: async (name: string, contactNumber: string, email: string, dateOfBirth: Date) => {
        console.log(dateOfBirth);
        return await axios.post("http://localhost:8080/candidate/create", {name: name, dateOfBirth: dateOfBirth, contactNumber: contactNumber, email: email});
    },
    deleteCandidate: async (candidateId: string) => {
        return await axios.delete(`http://localhost:8080/candidate/${candidateId}/delete`);
    },
    updateCandidate: async (candidateId: string, name: string, contactNumber: string, email: string, dateOfBirth: Date) => {
        return await axios.put(`http://localhost:8080/candidate/${candidateId}/edit`, {name: name, dateOfBirth: dateOfBirth, contactNumber: contactNumber, email: email});
    },
    getCandidateById: async (candidateId: string) => {
        return await axios.get(`http://localhost:8080/candidate/${candidateId}`);
    },
    removeSkillFromCandidate: async (candidateId: string, skillId: number) => {
        return await axios.patch(`http://localhost:8080/candidate/${candidateId}/remove/skill/${skillId}`);
    },
    addSkillToCandidate: async (candidateId: string, skillId: number) => {
        return await axios.patch(`http://localhost:8080/candidate/${candidateId}/add/skill/${skillId}`);
    },
    createNewSkill: async (name: string) => {
        return await axios.post("http://localhost:8080/skill/create", {name: name});
    },
    updateSkill: async (skillId: number, name: string) => {
        return await axios.put(`http://localhost:8080/skill/${skillId}/edit`, {name: name});
    },
    deleteSkill: async (skillId: number) => {
        return await axios.delete(`http://localhost:8080/skill/${skillId}/delete`);
    }
}